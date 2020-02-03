import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener, OnChanges } from '@angular/core';

declare var google: any;
@Component({
  selector: 'app-careerlevelfraudtrend',
  templateUrl: './careerlevelfraudtrend.component.html',
  styleUrls: ['./careerlevelfraudtrend.component.css']
})
export class CareerlevelfraudtrendComponent implements OnInit, AfterViewInit,OnChanges {
  myHeight = window.innerHeight;
  myWidth = window.innerWidth;
  getHeight() {
    return window.innerHeight;
  }
  getWeight() { return window.innerWidth; }

  getHeight1() {
    let dummy = window.innerHeight;
    return window.innerHeight * .75;
  }
  getWeight1() { return window.innerWidth * .75; }

  @ViewChild("pieChart", { static: false }) pieChart: ElementRef;
  @ViewChild("matCard", { static: false }) matCard: ElementRef;
  

  drawChart = () => {
    console.log(this.matCard, this.matCard.nativeElement);
    let Gheight = Number(window.getComputedStyle(document.getElementById('matCard')).height.split("px")[0]);
    let Gwidth = Number(window.getComputedStyle(document.getElementById('matCard')).width.split("px")[0]);

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
      //height: Gheight* .8,
      //width: Gwidth * .9
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

    let matCard = document.getElementById("matCard");
    console.log("printing matCard children :", matCard.children);
    for (let c in matCard.children) {
      console.log(c);
    }
    
    console.log("what is my screen orientation : ", screen.orientation, screen.orientation.type, screen.orientation.angle);
  }
  

  //@HostListener('window:orientationchange', ['$event'])
  @HostListener('window:resize', ['$event'])
  onOrientationChange(event) {
    console.log("does we have anything in event ? ", event.eventPhase);
    //let abc = new Promise((resolve, reject) => {
    //  if (event.eventPhase == 0) {
    //    resolve(0);
    //  }
      
    //});

    //const xyz = async () => {
    //  await abc.then(() => {
    //    console.log("eventPhase completed !!!!: ", event.eventPhase);
    //  });
    //}
    //xyz;

    console.log("what is my screen orientation : ", screen.orientation, screen.orientation.type, screen.orientation.angle);
    let myElem = document.getElementById("piechart");
    myElem.removeChild(myElem.firstChild);
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
