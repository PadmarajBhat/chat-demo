import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { DataLoaderService } from '../data-loader.service';
import { LoadScriptService } from '../../../load-script.service';

declare var google: any;
declare var googler: any;

@Component({
  selector: 'app-relocation-wise-trend',
  templateUrl: './relocation-wise-trend.component.html',
  styleUrls: ['./relocation-wise-trend.component.css']
})
export class RelocationWiseTrendComponent implements OnInit {

  @ViewChild('relocationTrend', { static: false }) relocationTrend: ElementRef;

  chartList = [
    { "chartId": "relocationTrend", "enable": true },
    { "chartId": "relocationTrend2", "enable": true },
  ];
  
  constructor(
    private dl: DataLoaderService,
    private ls: LoadScriptService
  ) { }


  ngOnInit() {
  }

  drawChart(subscriber, idName, chartTitle) {
    subscriber.subscribe(
      (x) => {

        console.log("the subscribed value ", x);
        const data = google.visualization.arrayToDataTable(x);
        var options = {
          title: chartTitle,
        };

        let myElem = document.getElementById(idName);
        var chart = new google.visualization.PieChart(myElem);
        chart.draw(data, options);
      },

      (err) => { console.log(idName + " error occurred in the subscription", err) },

      () => { console.log(idName+" subscription completed !!!") }
    );
  }

  drawIdChart(idName: string, func : () => any) {

    console.log("executing dummy", window['googler']);
    func();

    switch (idName) {

      case "relocationTrend":
        this.drawChart(this.dl.getRelocationData(), idName, "My Daily Activities");
        break;

      case "relocationTrend2":
        this.drawChart(this.dl.getRelocationData(), idName, "My Tuesday Activities");
        break;

      default:
        console.log(idName + " draw description is yet to be defined");
    }
    
  }

  drawAll() {

    for (let id of this.chartList) {
      this.drawIdChart(id['chartId'], () => { console.log("I am a dummy function") });
    }
    
  }

  getCareerLevelFraudStyle() {
    return {
      'margin': '5%',
      'background-color': 'white',
      'display': 'flex',
      'flex-direction': 'column',
      'height.px': window.innerHeight * .8,
    }
  }

  ngAfterViewInit() {
    this.ls.loadScript('googleCharts').then(() => {
      console.log("Google Chart Script got attached to body !!!", google);
      try {

        google.charts.load('current', { 'packages': ['corechart'] }).then(() => {

          console.log("Google Chart packages loaded at ngAfterViewInit!!!", google);

          google.charts.setOnLoadCallback(this.drawAll());
        });
      } catch {
        console.log("could not load google packages at ngAfterViewInit");
      }
    });
    console.log("ngAfterViewInit should be called only once during the component life cycle");
  }

  @HostListener('window:resize', ['$event, { passive: true }'])
  onOrientationChange() {


    for (let id of this.chartList) {
      try {
        let myElem = document.getElementById(id['chartId']);
        myElem.removeChild(myElem.firstChild);
      } catch {
        console.log("Accidental/Rare Exceptions for ", id['chartId']);
      }
    } 
    setTimeout(() => { google.charts.setOnLoadCallback(this.drawAll()); }, 5);

  }


}
