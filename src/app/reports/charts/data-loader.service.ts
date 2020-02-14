import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GoogleChartInterface } from './google-chart-interface';

declare var googler: any;

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  constructor(private http: HttpClient) { }

  getRelocationData() {
    window['googler'] = 50;
    //return new Observable((observer) => {
    //  observer.next(
    //    [
    //      ['Task', 'Hours per Day'],
    //      ['Work', 11],
    //      ['Eat', 2.7],
    //      ['Commute', 2],
    //      ['Watch TV', 2],
    //      ['Sleep', 7]
    //    ]
    //  );
    //  observer.complete();
    //});

    //return this.http.get("http://localhost:3000/reports/relocation_data");
    return this.http.get <string>("http://127.0.0.1:8282/reports/relocation_data");
  }
}
