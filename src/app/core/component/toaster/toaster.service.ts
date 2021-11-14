import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterSService {
  status = new BehaviorSubject<boolean>(false);
  currentStatus = this.status.asObservable();
  constructor() { }
  changeStatus(value) {
    this.status.next(value);
  }
}
