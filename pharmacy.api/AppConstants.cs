using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pharmacy.api
{
    public static class AppConstants
    {
        public const string MedicineAlreadyExists = "The medicine already exists with the give name.";
        public const string GeneralErrorMessage = "An unexpected error has occurred. Please try again later.";
        public const string MedicineExpiresIn15Days = "Medicines expiring in 15 days cannot be added to stock.";
    }
}
