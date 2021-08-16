import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private _title$: BehaviorSubject<string>;

  constructor() {
    this._title$ = new BehaviorSubject(null);
  }

  public get Title(){
    return this._title$.asObservable();
  }

  public setTitle(title: string) {
    this._title$.next(title);
  }
}
