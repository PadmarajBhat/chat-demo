import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenavContainer, MatDrawerContainer } from '@angular/material/sidenav';


@Component({
  selector: 'app-navigation-scroll-check',
  templateUrl: './navigation-scroll-check.component.html',
  styleUrls: ['./navigation-scroll-check.component.css']
})
export class NavigationScrollCheckComponent implements OnInit, AfterViewInit {

  @ViewChild(MatDrawerContainer, { static: true }) sidenavContainer: MatDrawerContainer;
  scrollOffset;
  myList = [
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
    { "id": "a", "value": "xyz" },
    { "id": "b", "value": "lmn" },
    { "id": "c", "value": "pqr" },
    { "id": "d", "value": "abc" },
  ];
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log("logging scrollable :", this.sidenavContainer);//,this.sidenavContainer.scrollable);
    this.scrollOffset = this.sidenavContainer.scrollable.elementScrolled().subscribe((x) => { console.log(x) });
  }
}
