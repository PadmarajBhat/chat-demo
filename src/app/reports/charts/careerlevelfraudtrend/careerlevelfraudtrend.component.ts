import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener, OnChanges, ViewChildren } from '@angular/core';

declare var google: any;
@Component({
  selector: 'app-careerlevelfraudtrend',
  templateUrl: './careerlevelfraudtrend.component.html',
  styleUrls: ['./careerlevelfraudtrend.component.css']
})

export class CareerlevelfraudtrendComponent implements OnInit, AfterViewInit,OnChanges {

  @ViewChild("pieChart0", { static: false }) pieChart0: ElementRef;
  @ViewChild("pieChart1", { static: false }) pieChart1: ElementRef;
  @ViewChild("pieChart2", { static: false }) pieChart2: ElementRef;
  @ViewChild("pieChart3", { static: false }) pieChart3: ElementRef;
  //@ViewChildren(ElementRef) charts;

  getCareerLevelFraudStyle() {
    return {
      'margin': '5%',
      'background-color': 'white',
      'display': 'flex',
      'flex-direction': 'column',
      'height.px':window.innerHeight*.8
    }
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

    var chart = new google.visualization.PieChart(document.getElementById("pieChart0"));
    chart.draw(data, options);

    var chart = new google.visualization.PieChart(document.getElementById("pieChart1"));
    chart.draw(data, options);

    var chart = new google.visualization.PieChart(document.getElementById("pieChart2"));
    chart.draw(data, options);

    var chart = new google.visualization.PieChart(document.getElementById("pieChart3"));
    chart.draw(data, options);
  }
  ngAfterViewInit() {

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);

    console.log("what is my screen orientation : ", screen.orientation, screen.orientation.type, screen.orientation.angle);
  }
  

  //@HostListener('window:orientationchange', ['$event'])
  @HostListener('window:resize', ['$event'])
  onOrientationChange(event) {
    for (var i = 0; i <= 3; i++) {
      let myElem = document.getElementById("pieChart"+i);
      myElem.removeChild(myElem.firstChild);
    }
    
    //window.addEventListener('orientationchange', function () {
    //  // After orientationchange, add a one-time resize event
    //  var afterOrientationChange = function () {
    //    // YOUR POST-ORIENTATION CODE HERE
    //    // Remove the resize event listener after it has executed
    //    console.log("reloading ...", window.onorientationchange);
    //    let myElem = document.getElementById("piechart");
    //    myElem.removeChild(myElem.firstChild);
    //    google.charts.setOnLoadCallback(this.drawChart);
    //    window.removeEventListener('resize', afterOrientationChange);
    //  };
    //  window.addEventListener('resize', afterOrientationChange);
    //});
    

    //let Gheight = Number(window.getComputedStyle(document.getElementById('matCard')).height.split("px")[0]);
    //let Gwidth = Number(window.getComputedStyle(document.getElementById('matCard')).width.split("px")[0]);

    //console.log("chart hieght and width", Gheight, Gwidth);

    //let drawChart = () => {
    //  const data = google.visualization.arrayToDataTable([
    //    ['Task', 'Hours per Day'],
    //    ['Work', 11],
    //    ['Eat', 2.7],
    //    ['Commute', 2],
    //    ['Watch TV', 2],
    //    ['Sleep', 7]
    //  ]);
    //  var options = {
    //    title: 'My Daily Activities',
    //    animation: {
    //      duration: 10000,
    //      easing: 'in'
    //    },
    //    //height: Gwidth * .8,
    //    //width: Gheight * .9
    //  };

      
    //  //console.log("Data in the recuritedby:", data);
    //  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    //  chart.draw(data, options);
    //  console.log("chart hieght and width", Gheight, Gwidth);
    //}
    
    console.log(window.innerHeight, window.innerWidth, screen.height, screen.width);
    //google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
    console.log("does we have anything in event ? ", event.eventPhase);
  }

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log("Am I being called when screen orientation changes ?????");
  }

}
