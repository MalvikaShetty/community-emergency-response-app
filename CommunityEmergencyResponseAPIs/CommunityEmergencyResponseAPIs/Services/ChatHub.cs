using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CommunityEmergencyResponseAPIs.Services
{
    public class ChatHub : Hub
    {
        private static readonly Dictionary<string, List<string>> _connectionsByEmail = new();
        private static readonly Dictionary<string, string> _connectionRoles = new();

        public override async Task OnConnectedAsync()
        {
            var email = Context.User?.FindFirst(ClaimTypes.Email)?.Value;
            var role = Context.User?.FindFirst(ClaimTypes.Role)?.Value;

            if (email != null)
            {
                if (!_connectionsByEmail.ContainsKey(email))
                {
                    _connectionsByEmail[email] = new List<string>();
                }
                _connectionsByEmail[email].Add(Context.ConnectionId);
                _connectionRoles[Context.ConnectionId] = role;
            }

            await base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var connectionToRemove = _connectionsByEmail.FirstOrDefault(kvp => kvp.Value.Contains(Context.ConnectionId));
            if (connectionToRemove.Value != null)
            {
                connectionToRemove.Value.Remove(Context.ConnectionId);
                if (!connectionToRemove.Value.Any())
                {
                    _connectionsByEmail.Remove(connectionToRemove.Key);
                }
                _connectionRoles.Remove(Context.ConnectionId);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessageToRole(string message) //Add email here
        {   
            var senderEmail = Context.User?.FindFirst(ClaimTypes.Email)?.Value;

            if (senderEmail != null)
            {
                if (_connectionRoles.TryGetValue(Context.ConnectionId, out var senderRole))
                {
                    if (senderRole == "User")
                    {
                        foreach (var (email, connections) in _connectionsByEmail)
                        {
                            if (email != senderEmail)
                            {
                                foreach (var connectionId in connections)
                                {
                                    if (_connectionRoles.TryGetValue(connectionId, out var receiverRole) && receiverRole == "Chat")
                                    {
                                        await Clients.Client(connectionId).SendAsync("ReceiveMessage", message, senderEmail);
                                    }
                                }
                            }
                        }
                    }
                }
                else
                {
                    // Handle case where sender role is not found for the connection ID
                    // Log an error or handle it accordingly
                    // For example:
                    Console.WriteLine("Sender role not found for connection ID: " + Context.ConnectionId);
                }
            }
        }


        public async Task ReplyMessage(string message, string receiverEmail)
        {
            var senderRole = _connectionRoles[Context.ConnectionId];

            if (senderRole == "Chat")
            {
                if (_connectionsByEmail.TryGetValue(receiverEmail, out var receiverConnections))
                {
                    foreach (var receiverConnectionId in receiverConnections)
                    {
                        await Clients.Client(receiverConnectionId).SendAsync("ReceiveMessage", message, Context.User?.FindFirst(ClaimTypes.Email)?.Value);
                    }
                }
            }
        }
    }
}
