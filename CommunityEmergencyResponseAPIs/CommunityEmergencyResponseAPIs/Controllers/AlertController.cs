using CommunityEmergencyResponseAPIs.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace CommunityEmergencyResponseAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlertController : ControllerBase
    {
        private readonly TwilioConfig _twilioConfig;

        public AlertController(IOptions<TwilioConfig> twilioConfig)
        {
            _twilioConfig = twilioConfig.Value;
        }

        [HttpPost("sendsms")] // Use HttpPost
        public IActionResult SendSMS([FromBody] SmsRequestModel request)
        {
            TwilioClient.Init(_twilioConfig.AccountSid, _twilioConfig.AuthToken);

            var messageOptions = new CreateMessageOptions(
            new PhoneNumber(request.PhoneNumber));
            messageOptions.From = new PhoneNumber(_twilioConfig.FromPhoneNumber);
            messageOptions.Body = request.Message;

            var messageFinal = MessageResource.Create(messageOptions);

            return Ok(messageFinal);
        }
    }

    public class SmsRequestModel
    {
        public string PhoneNumber { get; set; }
        public string Message { get; set; }
    }
}
