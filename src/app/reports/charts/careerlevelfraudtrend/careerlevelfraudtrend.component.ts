import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

declare var google: any;
@Component({
  selector: 'app-careerlevelfraudtrend',
  templateUrl: './careerlevelfraudtrend.component.html',
  styleUrls: ['./careerlevelfraudtrend.component.css']
})
export class CareerlevelfraudtrendComponent implements OnInit, AfterViewInit {
  myHeight = window.innerHeight;
  myWidth = window.innerWidth;
  @ViewChild("pieChart", { static: false }) pieChart: ElementRef;
  drawChart = () => {
    let data = google.visualization.arrayToDataTable([
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

    //console.log("Data in the recuritedby:", data);
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }
  ngAfterViewInit() {
    //  //declare var google: any;
    //  console.log("in ngAfterViewInit");
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  constructor() { }

  ngOnInit() {
  }

}
