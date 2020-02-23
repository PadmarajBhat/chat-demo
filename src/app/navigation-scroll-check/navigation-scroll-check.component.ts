import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenavContainer, MatDrawerContainer } from '@angular/material/sidenav';
import { CdkVirtualScrollViewport, ScrollDispatchModule, ScrollingModule} from '@angular/cdk/scrolling';


@Component({
  selector: 'app-navigation-scroll-check',
  templateUrl: './navigation-scroll-check.component.html',
  styleUrls: ['./navigation-scroll-check.component.css']
})
export class NavigationScrollCheckComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkVirtualScrollViewport, { static: true }) sidenavContainer: CdkVirtualScrollViewport;
  scrollOffset;
  lastScrolledIndex:string = "-1";
  currentScolledIndex:string;

  myList = [
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "pqr" },
    { "id": "e", "value": "pqr" },
    { "id": "f", "value": "pqr" },
    { "id": "g", "value": "pqr" },
    { "id": "h", "value": "pqr" },
    { "id": "i", "value": "pqr" },
    { "id": "j", "value": "pqr" },
  ];

  myOtherList = new Array;
  constructor() {
    for (var i = 0; i < 9; i++) {
      this.myOtherList.push({'id':"Item "+i, 'value':"item value "+i, "enable":false})
    }

    //console.log(this.myOtherList);
  }

  ngOnInit() {
  }

  getHref(id: string) {
    return "#" + id;
  }

  moveToId(id: string) {
    let myElem = document.getElementById(id);
    myElem.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    console.log("moveToId : ", id);
  }
  toggle(id: string) {

    for (var i = 0; i < this.myOtherList.length; i++) {
      if (this.myOtherList[i].id == "Item " + id) {
        this.myOtherList[i].enable = !this.myOtherList[i].enable;
        return;
      }
    }

  }

  getActiveStatus(id: string) {
    for (var i = 0; i < this.myOtherList.length; i++) {
      if (this.myOtherList[i].id == id) {
        return { 'active': this.myOtherList[i].enable };
      }
    }
  }

  ngAfterViewInit() {
    console.log("logging scrollable :", this.sidenavContainer);//,this.sidenavContainer.scrollable);
    //
    console.log("getDataLength : ", this.sidenavContainer.getDataLength());
    //this.sidenavContainer.scrollToIndex(160);
    this.sidenavContainer.scrollToIndex(55, "smooth");
    this.sidenavContainer.scrolledIndexChange.subscribe(
      (x) => {
        console.log("ScrolledIndexChange : ", x);
        this.toggle(x.toString());
        this.toggle(this.lastScrolledIndex);
        this.lastScrolledIndex = x.toString();
      }
    );

    this.sidenavContainer.renderedRangeStream.subscribe((x) => console.log("renderedRange : ", x));

  }

  trackByFunc(index, item) {
    console.log("trackByFunc : ", index, item);
    return index;
  }
}
