import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartList } from '../../root/reports/ChartList';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService extends ChartList{
  constructor(
    
    private http: HttpClient,
  ) { super();}

  getIdData(idName: string) {
    return this.http.get(this.getIdUrl(idName));
  }

}
