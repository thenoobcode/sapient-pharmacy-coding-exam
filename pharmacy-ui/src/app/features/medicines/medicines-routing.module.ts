import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { MedicineDetailComponent } from './medicine-detail/medicine-detail.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';

const routes: Routes = [
  { path: "", component: MedicineListComponent },
  { path: "add", component: AddMedicineComponent},
  { path: ":name", component: MedicineDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicinesRoutingModule { }
