import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MedicineListMessages } from 'src/app/shared/constants/app.constants';
import { IMedicine } from 'src/app/shared/models/iMedicine.model';
import { TitleService } from 'src/app/shared/services/title.service';
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit {

  medicineList: IMedicine[];
  filteredMedicines: IMedicine[];
  gridHeaders = [
    {
      field: "name",
      title: "Medicine Name"
    },
    {
      field: "brand",
      title: "Brand"
    },
    {
      field: "price",
      title: "Price"
    },
    {
      field: "quantity",
      title: "Quantity"
    },
    {
      field: "expiryDate",
      title: "Expiry Date"
    }
  ];
  constructor(
    private medicineSvc: MedicineService,
    private router: Router,
    private titleSvc: TitleService
  ) { }

  ngOnInit(): void {
    this.titleSvc.setTitle(MedicineListMessages.Title);
    this.getAllMedicines();
  }

  public searchMedicines(text: string) {
    // this.filterMedicines(text);
    this.filteredMedicines = this.medicineList
      .filter(m => m.name.toLowerCase().includes(text.toLowerCase()));
  }

  private filterMedicines(phrase: string) {
    // if (!phrase || phrase.length === 0) return;
    // this.medicineList.filter((m: IMedicine) => {
    //   if (m.name.toLowerCase().includes(phrase.toLowerCase())) {
    //     (<any>m)["hide"] = false;
    //     return m;
    //   }
    //   else {
    //     (<any>m)["hide"] = true;
    //     return null;
    //   }
    // });
  }

  public trackByMedicineName(index: number, m: IMedicine) {
    return m.name;
  }
  
  private getAllMedicines() {
    this.medicineSvc.getAllMedicines()
    .pipe(take(1))
    .subscribe(medicines => {
      this.filteredMedicines= this.medicineList = medicines;
    },
    (err)=> alert(err));
  }

  public expiredMedicine(medicine: IMedicine) {
    var today = new Date()
    var laterDate = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()+30);
    return medicine.expiryDate < laterDate;
  }

  public showDetails(medicineName: string) {
    this.router.navigate(['medicines',medicineName]);
  }

}
