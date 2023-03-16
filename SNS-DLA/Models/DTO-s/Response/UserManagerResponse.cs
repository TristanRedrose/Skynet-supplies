using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s.Response
{
    public class UserManagerResponse
    {
        public bool IsSuccess { get; set; }
        public LoginResponse? LoginResponse { get; set; }

        public ErrorResponse? ErrorResponse { get; set; }
    }
}
