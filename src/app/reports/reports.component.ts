import { Component, OnInit, HostListener, ElementRef, ViewChild, Renderer, AfterViewInit } from '@angular/core';

import { Router } from '@angular/router';
import { CareerlevelfraudtrendComponent } from './charts/careerlevelfraudtrend/careerlevelfraudtrend.component';
import { LoadScriptService } from '../load-script.service';
//import google from 'src/assets/google-chart-loader.js';

declare var google: any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, AfterViewInit {
  //@ViewChild('mydiv', { static: false }) myDiv: ElementRef;
  //@ViewChild('pieChartCard', { static: false }) pieChart3: ElementRef;
  @ViewChild(CareerlevelfraudtrendComponent, { static: false }) private myChild1: CareerlevelfraudtrendComponent;

  componentString = `<app-careerlevelfraudtrend > </app-careerlevelfraudtrend>`;
  loadedScript= false;
  constructor() {
    google.charts.load('current', { 'packages': ['corechart'] });
    //ls
    //  // one or more arguments
    //  .load('googleMaps')
    //  .then(data => {
    //    // script is loaded, use it
    //    this.loadedScript = true;
    //  });
  }
  setLoaded() {
    console.log("setLoaded");
    this.loadedScript = true;
  }
  getHeight() {
    //return screen.availHeight * .99;
    return window.innerHeight;
  }

  isBrowser() {
    console.log("the device : ", navigator.userAgent, navigator.userAgent.indexOf("WOW") );
    if ( navigator.userAgent.indexOf("WOW") > 0) {
      return true;
    }
  }
  ngOnInit() {
   let url = 'https://www.gstatic.com/charts/loader.js';
    //this.loadScript(url);/*.then(() => { console.log("script loaded")}, (err) => { console.log("error while loading script",err)});*/
   console.log("Loading : ", url, typeof google);
  }

  moveToCareer2() {
    console.log("moving reports scorll.....");
    //this.pieChart3.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    this.myChild1.moveToCareer2();
  }

  private loadScript(styleUrl: string) {
    //return new Promise((resolve, reject) => {
      const body = <HTMLDivElement>document.body;
      const script = document.createElement('script');
      script.innerHTML = '';
      script.src = styleUrl;
      script.async = false;
      script.defer = true;
    script.onload = () => {
      console.log("loaded script at loadScript");
      this.loadedScript = true;
    }
    console.log("appending the script to body");
      body.appendChild(script);
    //});
  }

  ngAfterViewInit() {
    console.log("pie chart card loaded !!!!");
  }
  //@HostListener('window:orientationchange', ['$event'])
  //onOrientationChange() {
  //  this.renderer.setElementStyle(this.myDiv.nativeElement, 'height', screen.availHeight.toString() + "px");         
  //}

}
