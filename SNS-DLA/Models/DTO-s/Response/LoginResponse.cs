using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s.Response
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public DateTime ExpireDate { get; set; }
    }
}
