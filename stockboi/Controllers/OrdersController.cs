using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using stockboi.Models;
using stockboi.RequestModels;
using System.Security.Principal;
using System.Security.Claims;
using stockboi.Helpers;
using Microsoft.AspNetCore.Http;

namespace stockboi.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        [HttpPost("[action]")]
        public PagingResponse<User> Logout([FromBody] PagingRequest request){
            return new PagingResponse<User>();
        }

    }
}
