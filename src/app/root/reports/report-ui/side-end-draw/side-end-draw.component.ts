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
      if (this.dashboard) {
        var tempList = new Array();
        for (let id of Object.keys(this.dl.chartList)) {
          if (this.dl.chartList[id].enable) {
            tempList.push(id)
          }
        }
        return tempList;
      } else {
        return Object.keys(this.dl.chartList);
      }
    } else {
      return [];
    }
  }

  moveToId(id: string) {
    console.log("scrolling");
    let myElem = document.getElementById(id);
    myElem.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }
}
