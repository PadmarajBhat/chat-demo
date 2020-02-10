import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener, OnChanges, ViewChildren } from '@angular/core';
import { google }  from 'src/assets/google-chart-loader.js';
declare var google: any;
@Component({
  selector: 'app-careerlevelfraudtrend',
  templateUrl: './careerlevelfraudtrend.component.html',
  styleUrls: ['./careerlevelfraudtrend.component.css']
})

export class CareerlevelfraudtrendComponent implements OnInit, AfterViewInit, OnChanges {
  //google: any;
  chartId: string = 'pieChart4';
  isScriptloaded = true;
  //@ViewChild("pieChart0", { static: true }) pieChart0: ElementRef;
  @ViewChild("pieChart1", { static: false }) pieChart1: ElementRef;
  @ViewChild("pieChart2", { static: true }) pieChart2: ElementRef;
  @ViewChild("pieChart3", { static: false }) pieChart3: ElementRef;
  //@ViewChild("pieChartCard", { static: false }) pieChartCard: ElementRef;
  //@ViewChild("pie", { static: true }) pie: ElementRef;
  
  
  //@ViewChildren(ElementRef) charts;
  ngOnInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
    //let i = 0;
    /*while (i) {
      try {
        const data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work', 11],
          ['Eat', 2.7],
          ['Commute', 2],
          ['Watch TV', 2],
          ['Sleep', 7]
        ]);
        i = 0;
      }
      catch{
        console.log("error while using google variable");
      }
    }*/
  }

  getCareerLevelFraudStyle() {
    return {
      'margin': '5%',
      'background-color': 'white',
      'display': 'flex',
      'flex-direction': 'column',
      'height.px': window.innerHeight * .8,
      //'width.%':100,
    }
  }

  moveToCareer2() {
    console.log("scrolling");
    this.pieChart3.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }

  drawChart = (elementToDrawOn:string) => {

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
    const chart1 = new google.visualization.PieChart(this.pieChart1.nativeElement);

    chart1.draw(data, options);
    

    var elementLast = document.getElementById(this.chartId);

    switch (elementToDrawOn) {
      case "pieChart0": {
        var chart = new google.visualization.PieChart(document.getElementById("pieChart0"));
        chart.draw(data, options);
        break;
      }
      case "pieChart1": {
        var chart = new google.visualization.PieChart(document.getElementById("pieChart1"));
        chart.draw(data, options);
        break;
      }
      case "pieChart2": {
        var chart = new google.visualization.PieChart(document.getElementById("pieChart2"));
        chart.draw(data, options);
        break;
      }
      case "pieChart3": {
        var chart = new google.visualization.PieChart(document.getElementById("pieChart3"));
        chart.draw(data, options);
        break;
      }
      default: {
        //statements;
        console.log("No expression matched for the switch statement !!!");
        break;
      }
    } 
    
  }
  ngAfterViewInit() {

    /*async () => { await google.charts.load('current', { 'packages': ['corechart'] }).then(() => { console.log("visulization loaded at constructor") }); }
    setTimeout(() => { console.log("did constructor load google ?", google); this.isScriptloaded = true; }, 1000);*/

    //google.charts.load('current', { 'packages': ['corechart'] });
    //google.charts.setOnLoadCallback(this.drawChart("pieChart3"));

    console.log("what is my screen orientation : ", screen.orientation, screen.orientation.type, screen.orientation.angle);
  }
  

  //@HostListener('window:orientationchange', ['$event'])
  @HostListener('window:resize', ['$event'])
  onOrientationChange(event) {
    this.isScriptloaded = false;
  
    for (var i = 0; i <= 3; i++) {
      try {
        let myElem = document.getElementById("pieChart" + i);
        myElem.removeChild(myElem.firstChild);
      }
      catch {
        console.log("could not delete the children");
      }
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
    /*this.isScriptloaded = true;
    google.charts.setOnLoadCallback(this.drawChart("pieChart2"));
    console.log("does we have anything in event ? ", event.eventPhase);*/
  }

  constructor() {
    /*console.log("constructor for career level hazir hai !!!!");
    async () => { await google.charts.load('current', { 'packages': ['corechart'] }).then(() => { console.log("visulization loaded at constructor")}); }
    setTimeout(() => { console.log("did constructor load google ?", google); this.isScriptloaded = true; }, 1000);*/
  }


  ngOnChanges() {
    console.log("Am I being called when screen orientation changes ?????");
  }

}
