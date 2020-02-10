import { Component, OnInit, ElementRef, ViewChild, HostBinding, HostListener } from '@angular/core';


@Component({
  selector: 'app-npm-google-charts',
  templateUrl: './npm-google-charts.component.html',
  styleUrls: ['./npm-google-charts.component.css']
})
export class NpmGoogleChartsComponent implements OnInit {

  @ViewChild('matCardContent', { static: false }) matCard: ElementRef;
  @ViewChild('matCardHeader', { static: false }) matCardHeader: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  getCareerLevelFraudStyle() {
    return {
      'margin': '5%',
      'background-color': 'gray',
      'display': 'flex',
      'flex-direction': 'column',
      'height.px': window.innerHeight * .8,
      //'width.%': 100,
    }
  }

  title = 'Browser market shares at a specific website, 2014';
  type = 'PieChart';
  data = [
    ['Firefox', 45.0],
    ['IE', 26.8],
    ['Chrome', 12.8],
    ['Safari', 8.5],
    ['Opera', 6.2],
    ['Others', 0.7]
  ];
  columnNames = ['Browser', 'Percentage'];
  options = {
  };
  
  height;
  width;
  flag = false;

  ngAfterViewInit() {
    this.height = Number(window.getComputedStyle(document.getElementById("mat-card-content"))['height'].split("px")[0]);
    this.width = Number(window.getComputedStyle(document.getElementById("mat-card-content"))['width'].split("px")[0]);
    console.log(this.height, this.width);
    this.flag = true;
    
  }

  @HostListener('window:resize')
  onResize() {
    var myelem = document.getElementById("mat-card-content")
    //myelem.removeChild(myelem.firstChild);
    console.log("resizing");
    this.flag = false;
    let height = this.height;
    this.height = this.width;
    this.width = height;
    this.flag = true;


  }
}
