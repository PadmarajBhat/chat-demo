import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsSideNavService {
  scrolledIndexChange: Observable<any>;

  constructor() { }

  setScrollIndexChange(obs: Observable<any>) {
    this.scrolledIndexChange = obs;
  }

  getScrollIndexChange() {
    return this.scrolledIndexChange;
  }
}
