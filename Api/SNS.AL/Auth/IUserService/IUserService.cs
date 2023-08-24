using SNS_DLA.Models.DTO_s;
using SNS_DLA.Models.DTO_s.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNS.AL.Auth.IAuthService
{
    public interface IUserService
    {
        Task<RegistrationResponse> RegisterUserAsync(RegistrationRequest request);
    }
}
