import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
declare var google: any;


@Component({
  selector: 'app-recruitedby',
  templateUrl: './recruitedby.component.html',
  styleUrls: ['./recruitedby.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(2000)
      ]),
      transition('* => void', [
        animate(2000, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})

export class RecruitedbyComponent implements OnInit, AfterViewInit {
  ngOnInit() {
    /*let url = 'https://www.gstatic.com/charts/loader.js';
    //this.loadScript(url).then(() => { console.log("loaded") });
    //this.loadScript('../assets/js/my-library.js');

    console.log("Loading : ", url,google);*/
    //console.log("Loading : ", typeof(   google));
  }
  @ViewChild("pieChart", { static: false }) pieChart: ElementRef;

  drawChart = () => {
    let data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 25.7],
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

  /*private loadScript(styleUrl: string) {
    return new Promise((resolve, reject) => {
      const body = <HTMLDivElement>document.body;
      const script = document.createElement('script');
      script.innerHTML = '';
      script.src = styleUrl;
      script.async = false;
    script.defer = true;
    script.onload = resolve;
      body.appendChild(script);
    });

  }*/
}
