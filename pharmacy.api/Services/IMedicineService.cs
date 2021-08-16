using pharmacy.api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pharmacy.api.Services
{
    public interface IMedicineService
    {
        IEnumerable<Medicine> GetAllMedicines();
        MedicineDetails GetMedicineDetails(string medicineName);

        void UpdateMedicineNotes(string medicineName, string notes);

        string AddMedicine(MedicineDetails medicine);
    }
}
