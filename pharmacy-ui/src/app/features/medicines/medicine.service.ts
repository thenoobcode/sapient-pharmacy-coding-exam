import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { APIRoutes } from 'src/app/shared/constants/api-routes.constants';
import { IMedicine } from 'src/app/shared/models/iMedicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) { }

  public getAllMedicines() {
    return this.http.get<IMedicine[]>(APIRoutes.Medicines.GetAll)
    .pipe(map(medicines => {
      medicines.forEach(m => m.expiryDate = new Date(m.expiryDate));
      return medicines;
    }));
  }

  public getMedicineDetails(name: string) {
    return this.http.get<IMedicine>(APIRoutes.Medicines.Get + `/${name}`);
  }

  public updateMedicineNotes(medicineName: string, notes: string) {
    const headers = new HttpHeaders().append("content-type", "application/json");
    return this.http.put<any>(APIRoutes.Medicines.UpdateNotes+`/${medicineName}`, JSON.stringify(notes), { headers: headers });
  }

  public AddMedicine(medicine: IMedicine) {
    return this.http.post<any>(APIRoutes.Medicines.Add, medicine);
  }
}
