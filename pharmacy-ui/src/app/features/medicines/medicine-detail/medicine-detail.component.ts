import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMedicine } from 'src/app/shared/models/iMedicine.model';
import { MedicineService } from '../medicine.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MedicineDetailsMessages } from 'src/app/shared/constants/app.constants';
import { CommonService } from 'src/app/shared/services/common.service';
import { TitleService } from 'src/app/shared/services/title.service';

@Component({
  selector: 'app-medicine-detail',
  templateUrl: './medicine-detail.component.html',
  styleUrls: ['./medicine-detail.component.scss']
})
export class MedicineDetailComponent implements OnInit, OnDestroy {
  medicineName: string;
  medicine: IMedicine;
  showModal: boolean;
  private routeSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
    private medicineSvc: MedicineService,
    private commonSvc: CommonService,
    private titleSvc: TitleService
  ) { }
  
  ngOnDestroy(): void {
    if (this.routeSubscription == null && !this.routeSubscription.closed)
      this.routeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.medicineName = params["name"];
      this.titleSvc.setTitle(MedicineDetailsMessages.Title);
      this.getMedicineDetails(this.medicineName);
    })
  }

  private getMedicineDetails(name: string) {
    this.medicineSvc.getMedicineDetails(name).pipe(take(1))
    .subscribe(_medicine => this.medicine = _medicine);
  }

  updateNotes() {
    let notes = this.medicine.notes;
    this.medicineSvc.updateMedicineNotes(this.medicine.name, notes)
    .pipe(take(1))
      .subscribe(() => {
        alert(MedicineDetailsMessages.NotesUpdatedSuccessfully);
        this.modalClosed();
        this.medicine.notes = notes;
      },
      err=> this.commonSvc.handleError(err)
    )
  }

  onUpdateRequest() {
    this.showModal = true;
  }

  modalClosed() {
    this.showModal = false;
    this.medicine.notes = null;
  }
}
