import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-side-end-draw',
  templateUrl: './side-end-draw.component.html',
  styleUrls: ['./side-end-draw.component.css']
})
export class SideEndDrawComponent implements OnInit {

  @Input() dashboard: boolean;
  @Input() dl;

  constructor(private platform: Platform) {
    console.log("side :", this.dashboard, this.dl);
  }

  ngOnInit() {
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
    console.log("scrolling");
    let myElem = document.getElementById(id+"_card");
    myElem.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  }
}
