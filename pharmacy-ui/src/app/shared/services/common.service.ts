import { Injectable } from '@angular/core';
import { CommonErrorMessage } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public handleError(err: any) {
    if (err?.error?.title)
      alert(err.error.title);
    else
      alert(CommonErrorMessage);
  }
}
