using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pharmacy.api.ErrorHandling;

namespace pharmacy.api.Controllers
{
    [Route("error")]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        private readonly IHttpContextAccessor _context;
        public ErrorController(IHttpContextAccessor context)
        {
            _context = context;
        }

        [Route("handle")]
        public IActionResult Get()
        {
            var problem = _context.HttpContext.Features.Get<IExceptionHandlerFeature>();
            string errorMessage;
            string errorDetail;
            int statusCode;
            if(problem.Error is PharmacyException)
            {
                var exception = problem.Error as PharmacyException;
                errorMessage = exception.Message;
                errorDetail = exception.StackTrace;
                statusCode = exception.StatusCode;
            }
            else
            {
                errorMessage = AppConstants.GeneralErrorMessage;
                statusCode = (int)HttpStatusCode.InternalServerError;
                errorDetail = problem.Error.StackTrace;
            }

            //var traceId = _context.HttpContext.TraceIdentifier;

            return new ObjectResult(new ProblemDetails
            {
                Detail = errorMessage,
                Title = errorMessage,
                Status = statusCode
            });
        }
    }
}