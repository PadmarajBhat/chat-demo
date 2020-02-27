import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChartsSideNavService } from '../../../../charts-side-nav.service';

@Component({
  selector: 'app-side-end-draw',
  templateUrl: './side-end-draw.component.html',
  styleUrls: ['./side-end-draw.component.css']
})
export class SideEndDrawComponent implements OnInit, AfterViewInit {
    
  @ViewChild("cdkViewPort", { static: false }) sidenavContainer: CdkVirtualScrollViewport;
  @Input() dashboard: boolean;
  //#Input() sidenavContainer: CdkVirtualScrollViewport;
  @Input() dl;
  lastScrolledIndex: string;

  constructor(
    private platform: Platform,
    private scrollIndexChange: ChartsSideNavService
  ) {
    console.log("side :", this.dashboard, this.dl);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //let sidenavContainer = document.getElementById("cdkViewPort");
    this.scrollIndexChange.getScrollIndexChange().subscribe(
      (x) => {
        console.log("ScrolledIndexChange : ", x);
        this.toggle(x.toString());
        this.toggle(this.lastScrolledIndex);
        this.lastScrolledIndex = x.toString();
      }
    );
  }

  getChartIds() {
    if (this.platform.isBrowser) {
      var tempList = new Array();
      if (this.dashboard) {

        for (let item of this.dl.chartList.getChartList(false)) {
          if (item.enable) {
            tempList.push(item['title'])
          }
        }
        return tempList;
      } else {
        for (let item of this.dl.chartList.getChartList(true)) {
            tempList.push(item['title']);
          
          //return this.dl.chartList.getIds();
        }
        return tempList;
      }
    }else {
      return [];
    }
  }

  moveToId(id: string) {
    console.log("scrolling side-end-draw", this.scrollIndexChange);
    let myElem = document.getElementById(id+"_card");
    myElem.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });

    this.scrollIndexChange.getScrollIndexChange().subscribe(
      (x) => {
        console.log("ScrolledIndexChange movetoId: ", x);
        this.toggle(x.toString());
        this.toggle(this.lastScrolledIndex);
        this.lastScrolledIndex = x.toString();
      }
    );
  }

  toggle(id: string) {

    for (var i = 0; i < this.dl.chartList.getChartList(!this.dashboard).length; i++) {
      if (this.dl.chartList.getChartList(!this.dashboard)[i].id == id) {
        this.dl.chartList.getChartList(!this.dashboard)[i].enable = !this.dl.chartList.getChartList(!this.dashboard)[i].enable;
        return;
      }
    }

  }

  getActiveStatus(id: string) {
    for (var i = 0; i < this.dl.chartList.getChartList(!this.dashboard).length; i++) {
      if (this.dl.chartList.getChartList(!this.dashboard)[i].id == id) {
        return { 'active': this.dl.chartList.getChartList(!this.dashboard)[i].enable };
      }
    }
  }
}
