import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {


  stateObj: any = {};

  constructor() { }

  setState(name: string, data: any) {
    this.stateObj[name] = data;
  }

  getSate(name: string) {
    return this.stateObj[name] || [];
  }
}
