import { Component, OnInit, HostListener, ElementRef, ViewChild, Renderer } from '@angular/core';

import { Router } from '@angular/router';
declare var google: any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  @ViewChild('mydiv', { static: false }) myDiv: ElementRef;

  constructor(private renderer: Renderer) { }

  getHeight() {
    return screen.availHeight;
  }

  isBrowser() {
    console.log("the device : ", navigator.userAgent, navigator.userAgent.indexOf("WOW") );
    if ( navigator.userAgent.indexOf("WOW") > 0) {
      return true;
    }
  }
  ngOnInit() {
   let url = 'https://www.gstatic.com/charts/loader.js';
    this.loadScript(url).then(() => { console.log("script loaded")}, (err) => { console.log("error while loading script",err)});
   console.log("Loading : ", url, typeof google);
  }

  private loadScript(styleUrl: string) {
    return new Promise((resolve, reject) => {
      const body = <HTMLDivElement>document.body;
      const script = document.createElement('script');
      script.innerHTML = '';
      script.src = styleUrl;
      script.async = false;
      script.defer = true;
      //script.onload = resolve;
      body.appendChild(script);
    });
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange() {
    this.renderer.setElementStyle(this.myDiv.nativeElement, 'height', screen.availHeight.toString() + "px");         
  }

}
