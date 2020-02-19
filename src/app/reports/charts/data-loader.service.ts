import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GoogleChartInterface } from './google-chart-interface';


@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  baseUrl = 'http://127.0.0.1:8282/reports/getTrendData?TrendName='

  chartList = {
    "relocationTrend": { "enable": false, "title": "My Daily Activities", "url": 'http://127.0.0.1:8282/reports/relocationTrendData' },
    "relocationTrend2": { "enable": false, "title": "My Tuesday Activities", "url": 'http://127.0.0.1:8282/reports/skillLevelTrendData' },
    "relocationTrend3": { "enable": false, "title": "My Wednusday Activities", "url": this.baseUrl+'reloc_required' },
  };

  constructor(private http: HttpClient) { }

  getIdData(idName: string) {
    return this.http.get(this.chartList[idName].url);
  }

  setEnableId(idName: string) {
    this.chartList[idName].enable = !this.chartList[idName].enable;
  }
}
