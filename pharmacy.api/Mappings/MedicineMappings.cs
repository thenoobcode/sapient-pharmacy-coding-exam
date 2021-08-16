using AutoMapper;
using pharmacy.api.Models;

namespace pharmacy.api.Mappings
{
    public class MedicineMappings: Profile
    {
        public MedicineMappings()
        {
            CreateMaps();
        }

        private void CreateMaps()
        {
            CreateMap<MedicineDetails, Medicine>();
        }
    }
}
