import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() show:boolean;
  @Output() closed: EventEmitter<any>= new EventEmitter();

  constructor(private elemRef:ElementRef) { }

  @HostListener('window:popstate', ['$event'])
  on_WindowPopState(event: any) {
    event.preventDefault();
  }

  @HostListener('window:keydown', ['$event'])
  on_WindowKeyDown(event: any) {
    var code= event.which || event.keycode;
    if(code==27){ //escape
      event.preventDefault();
      this.onClose();
    }
  }

  ngOnInit() {
  }

  onClose(){
    this.show=false;
    this.closed.emit();
  }

}
