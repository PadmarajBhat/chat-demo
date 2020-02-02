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

    var chart = new google.visualization.PieChart(this.pieChart.nativeElement);

    chart.draw(data, options);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  getMyStyle() {
    return {
      'height.px': screen.availHeight * .75,
      'align-self': 'center',
      'width':'inherit'
    }
  }

}
