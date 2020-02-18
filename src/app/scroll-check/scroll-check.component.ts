import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-scroll-check',
  templateUrl: './scroll-check.component.html',
  styleUrls: ['./scroll-check.component.css']
})
export class ScrollCheckComponent implements OnInit {

  listItems = ["abcd", "xyz", "lmn", "ooo"];
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  viewport: CdkVirtualScrollViewport;

  constructor() { }

  ngOnInit() {
  }

  scrolled() {
    console.log(this.viewport.measureScrollOffset());
  }

}
