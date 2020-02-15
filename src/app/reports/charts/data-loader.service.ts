import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GoogleChartInterface } from './google-chart-interface';


@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  chartList = {
    "relocationTrend": { "enable": false, "title": "My Daily Activities", "url": 'http://127.0.0.1:8282/reports/relocation_data' },
    "relocationTrend2": { "enable": false, "title": "My Tuesday Activities", "url": 'http://127.0.0.1:8282/reports/relocation_data' },
    "relocationTrend3": { "enable": false, "title": "My Wednusday Activities", "url": 'http://127.0.0.1:8282/reports/relocation_data' },
  };

  constructor(private http: HttpClient) { }

  getIdData(idName: string) {
    return this.http.get(this.chartList[idName].url);
  }

  setEnableId(idName: string) {
    this.chartList[idName].enable = !this.chartList[idName].enable;
  }
}
