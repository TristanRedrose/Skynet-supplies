using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s.Response
{
    public class UserDetails
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("surname")]
        public string Surname { get; set; }

        [JsonPropertyName("phone")]
        public string Phone { get; set; }

        [JsonPropertyName("country")]
        public string Country { get; set; }

        [JsonPropertyName("city")]
        public string City { get; set; }

        [JsonPropertyName("street")]
        public string Street { get; set; }

        [JsonPropertyName("postCode")]
        public string PostCode { get; set; }
    }
}
