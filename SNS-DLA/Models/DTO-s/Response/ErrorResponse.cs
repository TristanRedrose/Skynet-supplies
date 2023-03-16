using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.DTO_s.Response
{
    public class ErrorResponse
    {
        public IEnumerable<string>? Errors { get; set; }
        public string Message { get; set; }
    }
}
