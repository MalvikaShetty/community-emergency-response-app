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
/*            TwilioClient.Init(_twilioConfig.AccountSid, _twilioConfig.AuthToken);*/
            TwilioClient.Init("AC6dcd91dc5f555163a54b3f82c54d8477", "80dce6b80be977e167e03a2d583030f6");

            var messageOptions = new CreateMessageOptions(
            new PhoneNumber(request.PhoneNumber));
            /* messageOptions.From = new PhoneNumber(_twilioConfig.FromPhoneNumber);*/
            messageOptions.From = new PhoneNumber("+18883717229");
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
