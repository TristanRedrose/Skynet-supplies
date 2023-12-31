﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS_DLA.Models.Entities
{
    public class User : IdentityUser
    {

        public string Name { get; set; }
        public string Surname { get; set; }
        public int ContactInfoId { get; set; }
        public ContactInfo ContactInfo { get; set; }
    }
}
