using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using pharmacy.api.ErrorHandling;
using pharmacy.api.Models;

namespace pharmacy.api.Services
{
    public class MedicineService : IMedicineService
    {
        private readonly List<MedicineDetails> _medicines;
        private readonly IMapper _mapper;
        public MedicineService(List<MedicineDetails> medicines,
            IMapper mapper)
        {
            _medicines = medicines;
            _mapper = mapper;
        }

        public string AddMedicine(MedicineDetails medicine)
        {
            var medicineFound = GetMedicineDetails(medicine.Name);
            if (medicineFound != null)
                throw new PharmacyException(AppConstants.MedicineAlreadyExists, (int)HttpStatusCode.BadRequest);

            if(medicine.ExpiryDate < DateTime.UtcNow.AddDays(15))
                throw new PharmacyException(AppConstants.MedicineExpiresIn15Days, (int)HttpStatusCode.BadRequest);

            _medicines.Add(medicine);

            return medicine.Name;
        }

        public IEnumerable<Medicine> GetAllMedicines()
        {
            return _mapper.Map<IEnumerable<Medicine>>(_medicines);
        }

        public MedicineDetails GetMedicineDetails(string medicineName)
        {
            return _medicines.FirstOrDefault(m => m.Name == medicineName);
        }

        public void UpdateMedicineNotes(string medicineName, string notes)
        {
            //var medicineFound = GetMedicineDetails(medicineName);
            var medicineFoundIndex = _medicines.FindIndex(m => m.Name.Equals(medicineName, StringComparison.OrdinalIgnoreCase));
            if (medicineFoundIndex < 0)
                throw new PharmacyException() { StatusCode = (int)HttpStatusCode.NotFound };

            _medicines[medicineFoundIndex].Notes = notes;            
        }
    }
}
