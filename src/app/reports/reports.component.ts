import { Component, OnInit, HostListener, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
declare var google: any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  @ViewChild('mydiv', { static: false }) pRef: ElementRef;
  chartsLoaded = false;
  height = window.innerHeight;
  width = window.innerWidth;
  constructor(private rout: Router, private ref: ChangeDetectorRef) { }

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
  onOrientationChange(event) {
    this.ref.detach();
    console.log('orientationChanged');
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.pRef.nativeElement.style.height = this.height;
    this.pRef.nativeElement.style.width = this.width;
    
    
    this.ref.reattach();
    //this.rout.navigateByUrl('/');
    const body = <HTMLDivElement>document.body;
    //$("#div1").load();
    const div = body.getElementsByClassName("mainBar").item;
    window.location.reload();
    
    console.log("trying to rerender", this.pRef, this.pRef.nativeElement.style.height, this.pRef.nativeElement.style.width);

  }

}
