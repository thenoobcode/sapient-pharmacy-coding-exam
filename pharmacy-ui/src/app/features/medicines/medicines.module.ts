import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicinesRoutingModule } from './medicines-routing.module';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineDetailComponent } from './medicine-detail/medicine-detail.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/components/modal/modal.module';

@NgModule({
  declarations: [MedicineListComponent, MedicineDetailComponent, AddMedicineComponent],
  imports: [
    CommonModule,
    MedicinesRoutingModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule
  ]
})
export class MedicinesModule { }
