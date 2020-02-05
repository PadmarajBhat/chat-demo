import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener, Renderer } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AUTO_STYLE
} from '@angular/animations';
import { inherits } from 'util';
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
  @ViewChild('mydiv', { static: false }) myDiv: ElementRef;
  pieChartHeight: number;
  pieChartWidth: number;
  
  

  constructor(private renderer: Renderer) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit: drawChart");
    let drawChart = () => {
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
        height: this.getHeightOrWidth(this.pieChart.nativeElement.parentElement),
        width: this.getHeightOrWidth(this.pieChart.nativeElement.parentElement, false)
      };

      var chart = new google.visualization.PieChart(this.pieChart.nativeElement);

      chart.draw(data, options);
    }
    
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
  }

  getHeightOrWidth(elem: HTMLElement, hieght: Boolean = true) {
    var csss = window.getComputedStyle(elem);

    if (hieght) {
      return Number(csss.height.split("px")[0]) * .9;
    } else {
      return Number(csss.width.split("px")[0]) * .9;
    }
    

  }
  //getMyStyle() {
  //  return {
  //    'height.px': this.getHeightOrWidth(document.getElementById("myDiv")),
  //    'align-self': 'center',
  //    'width.px': this.getHeightOrWidth(document.getElementById("myDiv"), false),
  //    //'padding' : '1%'
  //    'margin':'0 auto'
  //  }
  //}

  getMyStyle() {
    return {
      'height.%': '90%',
      'align-self': 'center',
      'width.%': '90%',
      'position': 'fixed',
      'top': '5%',
      'left':'5%',
      //'padding' : '1%'
      //'margin': '0 auto'
    }
  }

  @HostListener('window:resize')
  onOrientationChange() {
    //this.renderer.setElementStyle(this.pieChart.nativeElement, 'height', screen.availHeight.toString() + "px");
    console.log("trying to redraw");
    
    ////let pnode = this.pieChart.nativeElement.parentNode;
    //let mySelf = this.pieChart.nativeElement;
    ////this.pieChart.nativeElement.parentNode.removeChild(this.pieChart.nativeElement);
    //this.pieChart.nativeElement.removeChild(this.pieChart.nativeElement.firstElementChild);
    //let styleString = mySelf.getAttribute("style");
    //console.log("type of styleString", typeof styleString, styleString, JSON.stringify(styleString));
    //let styleObj = JSON.parse(JSON.stringify('{'+styleString+'}'));
    
    ////console.log("myold state", mySelf, styleObj, styleObj[height], styleObj['width']);
    //var newElement = document.createElement('div');
    
    //newElement.get
    //newElement.setAttribute('id', 'pieChart');
    //newElement.setAttributeNode(node);
    
    
    //newElement.innerHTML = html;
    //pnode.appendChild(mySelf);
    //this.this.getHeightOrWidth(this.pieChart.nativeElement);
    //this.pieChartWidth = Number(csss.width.split("px")[0]) * .9;
    let drawChart = () => {
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
        height: screen.availHeight*.75,
        width: screen.availWidth * .95
      };

      var chart = new google.visualization.PieChart(this.pieChart.nativeElement);

      chart.draw(data, options);
    }

    google.charts.setOnLoadCallback(drawChart);
    //this.ngAfterViewInit();
    //google.charts.setOnLoadCallback(this.drawChart);

  }

}
