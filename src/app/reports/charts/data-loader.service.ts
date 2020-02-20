import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GoogleChartInterface } from './google-chart-interface';
import { ChartList } from '../../root/reports/ChartList';


@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  public chartList: ChartList = new ChartList();
  constructor(
    private http: HttpClient,
  ) { }

  getIdData(idName: string) {
    return this.http.get(this.chartList.getIdUrl(idName));
  }

}
