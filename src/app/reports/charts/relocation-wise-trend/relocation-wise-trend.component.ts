import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { DataLoaderService } from '../data-loader.service';
import { LoadScriptService } from '../../../load-script.service';

declare var google: any;

@Component({
  selector: 'app-relocation-wise-trend',
  templateUrl: './relocation-wise-trend.component.html',
  styleUrls: ['./relocation-wise-trend.component.css']
})
export class RelocationWiseTrendComponent implements OnInit {

  @ViewChild('relocationTrend', { static: false }) relocationTrend: ElementRef;
  
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

  drawChart2(idName: string) {
    switch (idName) {
      case "relocationTrend":
        const subscriber = this.dl.getRelocationData();
        this.drawChart(subscriber, idName, "My Daily Activities");
        break;

      default:
        console.log(idName + " draw description is yet to be defined");
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

          google.charts.setOnLoadCallback(this.drawChart2("relocationTrend"));
        });
      } catch {
        console.log("could not load google packages at ngAfterViewInit");
      }

    });
    console.log("ngAfterViewInit should be called only once during the component life cycle");
  }
  //

  @HostListener('window:resize', ['$event, { passive: true }'])
  onOrientationChange() {
    let myElem = document.getElementById("relocationTrend");
    try {
      myElem.removeChild(myElem.firstChild);
    } catch {
      console.log("Accidental/Rare Exceptions !!!");
    }finally {
      setTimeout(() => { google.charts.setOnLoadCallback(this.drawChart2("relocationTrend")); }, 5);
    }
    //google.charts.setOnLoadCallback(this.drawChart());
    //this.ngAfterViewInit()

    //this.relocationTrend.nativeElement.removeChild(this.relocationTrend.nativeElement.firstTrend);
  }


}
