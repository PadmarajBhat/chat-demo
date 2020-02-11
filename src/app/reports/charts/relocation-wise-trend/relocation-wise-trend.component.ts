import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
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
  switchOn = true;
  constructor(
    private dl: DataLoaderService,
    private ls: LoadScriptService
  ) { }


  ngOnInit() {
  }

  drawChart = () => {

    const data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2.7],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7]
    ]);
    var options = {
      title: 'My Daily Activities',
      animation: {
        duration: 10000,
        easing: 'in'
      },
    };

    var chart = new google.visualization.PieChart(document.getElementById("relocationTrend"));
    chart.draw(data, options);
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

          google.charts.setOnLoadCallback(this.drawChart());
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
      console.log("Accidental rare Exceptions !!!");
    }finally {
      setTimeout(() => { google.charts.setOnLoadCallback(this.drawChart()); }, 5);
    }
    //google.charts.setOnLoadCallback(this.drawChart());
    //this.ngAfterViewInit()

    //this.relocationTrend.nativeElement.removeChild(this.relocationTrend.nativeElement.firstTrend);
  }
}
