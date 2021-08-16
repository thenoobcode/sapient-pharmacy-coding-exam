import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AddMedicineMessages, MedicineDetailsMessages } from 'src/app/shared/constants/app.constants';
import { IMedicine } from 'src/app/shared/models/iMedicine.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { TitleService } from 'src/app/shared/services/title.service';
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss']
})
export class AddMedicineComponent implements OnInit {
  medicineForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private medicineSvc: MedicineService,
    private commonSvc: CommonService,
    private router: Router,
    private titleSvc: TitleService
  ) { }

  ngOnInit(): void {
    this.titleSvc.setTitle(AddMedicineMessages.Title);
    this.medicineForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(0)]],
      expiryDate: [null, [Validators.required, this.dateValidator.bind(this)]],
      notes: [null]
    });
  }

  public addMedicine() {
    if (this.medicineForm.invalid) return;

    let medicine: IMedicine = this.medicineForm.value;

    if (this.isDateLessThan(medicine.expiryDate, 30))
      alert(AddMedicineMessages.ExpiryLessThan30Days);

    this.medicineSvc.AddMedicine(medicine)
    .pipe(take(1))
    .subscribe(()=>{
      alert(AddMedicineMessages.MedicineAddSuccess);
      this.medicineForm.reset();
      this.router.navigate(["medicines"]);
    },
    (err)=> this.commonSvc.handleError(err));
  }

  dateValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value == null) return null;
    let date = new Date(control.value);
    if (this.isDateLessThan(date, 15))
      return { "minExpiryDate": true };
    else
      return null;
  }

  private isDateLessThan(compareDate: Date, days: number) {
    let today = new Date();
    let dateAfterNDays = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + days);
    return compareDate < dateAfterNDays;
  }

}
