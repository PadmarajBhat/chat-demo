import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataLoaderService } from '../../reports/charts/data-loader.service';
import { Platform } from '@angular/cdk/platform';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animate';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  animations: [slideInAnimation],
})
export class ReportsComponent implements OnInit,AfterViewInit {

  dashboard: boolean = false;
  constructor(
    private dl: DataLoaderService,
    private platform:Platform
  ) { }

  ngOnInit() {
  }

  getReportMainHeight() {
    if (!this.platform.isBrowser) {
      return window.innerHeight * .6
    }
    return window.innerHeight * .7
  }

  ngAfterViewInit() {
    //let myElem = document.getElementById("charts");
    //myElem.click();
  }

  setDashboard(bool: boolean) {
    this.dashboard = bool;
  }

  getDashboard() {
    return this.dashboard;
  }
  getDl() {
    return this.dl;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
