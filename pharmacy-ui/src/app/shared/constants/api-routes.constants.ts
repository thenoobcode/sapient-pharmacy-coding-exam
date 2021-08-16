import { environment } from "src/environments/environment"

export const MedicineController = environment.apiBaseURL + "/medicines";

export const APIRoutes = {
    Medicines: {
        GetAll: MedicineController,
        Get: MedicineController,
        UpdateNotes: MedicineController,
        Add: MedicineController + "/add"
    }
}