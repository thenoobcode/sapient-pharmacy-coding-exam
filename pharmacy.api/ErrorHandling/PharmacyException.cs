using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pharmacy.api.ErrorHandling
{
    public class PharmacyException: Exception
    {
        public PharmacyException()
        {

        }
        public PharmacyException(string message, int statusCode=500): base(message)
        {
            StatusCode = statusCode;
        }

        public int StatusCode { get; set; }
    }
}
