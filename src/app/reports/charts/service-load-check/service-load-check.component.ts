import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { LoadScriptService } from '../../../load-script.service';

declare var google: any;

@Component({
  selector: 'app-service-load-check',
  templateUrl: './service-load-check.component.html',
  styleUrls: ['./service-load-check.component.css']
})
export class ServiceLoadCheckComponent implements OnInit, AfterViewInit {
  @ViewChild("pieChart3", { static: true }) pieChart3: ElementRef;

  constructor(private ls: LoadScriptService) {
  }

  ngOnInit() {
    console.log("ServiceLoadCheckComponent ngOnInit !!!!");
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

  drawChart = (elementToDrawOn: string) => {
    
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
    this.ls.loadScript('googleCharts').then(() => {
      console.log("Google Chart Script got attached to body !!!", google);
      try {
        google.charts.load('current', { 'packages': ['corechart'] }).then(() => {

          console.log("Google Chart packages loaded at ngAfterViewInit!!!", google);

          google.charts.setOnLoadCallback(this.drawChart("pieChart3"));
        });
      } catch {
        console.log("could not load google packages at ngAfterViewInit");
      }

    });
    console.log("ngAfterViewInit should be called only once during the component life cycle");
  }


}
