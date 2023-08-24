using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s.Response
{
    public class TokenResponse
    {
        public JwtSecurityToken Token { get; set; }
        public string TokenAsString { get; set; }

        public string Role { get; set; }
    }
}
