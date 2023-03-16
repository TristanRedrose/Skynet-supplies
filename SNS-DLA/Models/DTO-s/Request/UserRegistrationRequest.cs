using SNS_DLA.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s
{
    public class UserRegistrationRequest
    {
        [JsonPropertyName("email")]
        [Required]
        [StringLength(50)]
        [EmailAddress]
        public string Email { get; set; }

        [JsonPropertyName("password")]
        [Required]
        [StringLength(50, MinimumLength = 8)]
        public string Password { get; set; }

        [JsonPropertyName("passConfirm")]
        [Required]
        [StringLength(50, MinimumLength = 8)]
        public string PassConfirm { get; set; }

        [JsonPropertyName("name")]
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [JsonPropertyName("surname")]
        [Required]
        [StringLength(50)]
        public string Surname { get; set; }

        [JsonPropertyName("phone")]
        [Required]
        [StringLength(50)]
        public string Phone { get; set; }

        [JsonPropertyName("country")]
        [Required]
        [StringLength(50)]
        public string Country { get; set; }

        [JsonPropertyName("city")]
        [Required]
        [StringLength(50)]
        public string City { get; set; }

        [JsonPropertyName("street")]
        [Required]
        [StringLength(50)]
        public string Street { get; set; }

        [JsonPropertyName("postCode")]
        [Required]
        [StringLength(50)]
        public string PostCode { get; set; }
    }
}
