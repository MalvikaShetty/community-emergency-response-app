using CommunityEmergencyResponseAPIs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using Twilio.TwiML.Messaging;
using Twilio.TwiML.Voice;

namespace CommunityEmergencyResponseAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatAIController : ControllerBase
    {
        private readonly EmergencyResponseDbContext _context;
        private readonly HttpClient _client;

        public ChatAIController(EmergencyResponseDbContext context)
        {
            _context = context;
            _client = new HttpClient();
            _client.DefaultRequestHeaders.Add("authorization", "Bearer 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");
        }

        [HttpPost("getanswer")]
        public async Task<IActionResult> GetAnswer(string question)
        {
            if (string.IsNullOrEmpty(question))
            {
                return BadRequest("Question is required");
            }

            string answer = await GenerateAnswer(question);
            return Ok(new { answer });
        }

        private async Task<dynamic> GenerateAnswer(string question)
        {
            var requestBody = new
            {
                model = "gpt-3.5-turbo",
                messages = new[]
                {
                    new { role = "user", content = question },
                },
                temperature = 0.5,
                max_tokens = 100
            };

            /*    var requestBody = new StringContent("{\"model\": \"gpt-3.5-turbo\", \"messages\": \"" + question + "\", \"temperature\":1,\"max_tokens\":100 }",
                   Encoding.UTF8, "application/json");
    */
            var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _client.PostAsync("https://api.openai.com/v1/chat/completions", content);
            string responseString = await response.Content.ReadAsStringAsync();
          
            // Check if the response is successful
            if (response.IsSuccessStatusCode)
            {
                // Deserialize the response/
                dynamic result = JsonConvert.DeserializeObject<dynamic>(responseString);

                // Check if the result contains the expected structure
                if (result != null && result.choices != null && result.choices.Count > 0 && result.choices[0].message.content != null)
                {
                    // Return the text of the first choice
                    return result.choices[0].message.content;
                }
                else
                {
                    // Log an error or handle the case where the response does not match the expected structure
                    Console.WriteLine("Error: Unexpected response structure");
                    return "Error: Unexpected response structure";
                }
            }
            else
            {
                // Log an error or handle the case where the response is not successful
                Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                return $"Error: {response.StatusCode} - {response.ReasonPhrase}";
            }
        }
    }
}
