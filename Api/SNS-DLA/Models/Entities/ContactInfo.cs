using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.Entities
{
    public class ContactInfo
    {
        public int ContactInfoId { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
        public string Country { get; set; }
    }
}
