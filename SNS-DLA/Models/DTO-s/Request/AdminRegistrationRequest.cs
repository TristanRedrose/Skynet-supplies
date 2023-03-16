using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s.Request
{
    public class AdminRegistrationRequest
    {
        [JsonPropertyName("username")]
        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [JsonPropertyName("password")]
        [Required]
        [StringLength(50, MinimumLength = 8)]
        public string Password { get; set; }

        [JsonPropertyName("passConfirm")]
        [Required]
        [StringLength(50, MinimumLength = 8)]
        public string PassConfirm { get; set; }
    }
}
