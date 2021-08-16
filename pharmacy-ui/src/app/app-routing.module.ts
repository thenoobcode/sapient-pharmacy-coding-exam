import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';

const routes: Routes = [
  { path:"", redirectTo: "medicines", pathMatch: "full" },
  { path: "medicines", loadChildren: () => import('./features/medicines/medicines.module').then(m => m.MedicinesModule) },
  { path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
