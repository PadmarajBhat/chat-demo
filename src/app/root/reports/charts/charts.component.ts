import { Component, OnInit, ViewChild, ElementRef, HostListener, Input, ChangeDetectorRef, AfterViewChecked, AfterContentChecked, AfterViewInit } from '@angular/core';
import { DataLoaderService } from '../../../reports/charts/data-loader.service';
import { LoadScriptService } from '../../../load-script.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatBottomSheet, MatBottomSheetRef, MatBottomSheetConfig } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChartsSideNavService } from '../../../charts-side-nav.service';
//import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';

declare var google: any;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  //animations: [
  //  trigger('flyInOut', [
  //    state('in', style({ transform: 'translateX(0)' })),
  //    transition('void => *', [
  //      style({ transform: 'translateX(-100%)' }),
  //      animate(500)
  //    ]),
  //    transition('* => void', [
  //      animate(500, style({ transform: 'translateX(100%)' }))
  //    ])
  //  ])
  //]
})
export class ChartsComponent implements OnInit, AfterViewInit {
  
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewport: CdkVirtualScrollViewport;

  lastScrolledIndex: number;
  cssArray = new Array();

  constructor(
    private dl: DataLoaderService,
    private ls: LoadScriptService,
    private _sb: MatSnackBar,
    private _bottomSheet: MatBottomSheet,
  ) {
  }


  ngOnInit() {
    //this.scrollIndexChange.setScrollIndexChange(this.viewport.scrolledIndexChange);
    for (var i = 0; i < this.dl.chartList.getChartList(true).length; i++) {
      this.cssArray.push(false);
    }
  }

  drawChart(idName) {
    let subscriber = this.dl.getIdData(idName);
    subscriber.subscribe(
      (x) => {

        console.log("the subscribed value ", x, idName);
        const data = google.visualization.arrayToDataTable(x['data']);
        //var options = {
        //  title: this.dl.chartList[idName].title,
        //};
        //var options = {};

        //var options = { colors: ['#800000', '#8b0000', '#a52a2a', '#b22222', '#dc143c','']};
        var options = {
          //colors: ['#800000', /* '#8b0000',*/ '#a52a2a', '#b22222', '#dc143c', /*'#ff0000',*/ '#cd5c5c', '#ff6347', '#bc8f8f', '#fa8072', '#f08080', '#ffb6c1', '#ffc0cb'
          //  , '#ffe4e1', '#ffe4e1', '#ffe4e1', '#ffe4e1', '#ffe4e1', '#ffe4e1', '#ffe4e1', '#ffe4e1', '#ffe4e1', '#ffe4e1', '#ffe4e1', '#ffe4e1', '#ffe4e1', '#ffe4e1',
          //colors: ['#78281F', '#943126', '#B03A2E', '#CB4335', '#E74C3C', '#EC7063', '#F1948A', '#F5B7B1', '#FADBD8', '#FDEDEC', '#FDEDEC', '#FDEDEC',
          //  '#FDEDEC', '#FDEDEC', '#FDEDEC', '#FDEDEC', '#FDEDEC', '#FDEDEC', '#FDEDEC', '#FDEDEC', '#FDEDEC', '#FDEDEC', '#FDEDEC', '#FDEDEC',
          //  '#FDEDEC', '#FDEDEC', '#FDEDEC', '#FDEDEC',
          //]
          colors : x['colors']
        };

        let myElem = document.getElementById(idName);
        var chart = new google.visualization.PieChart(myElem);
        chart.draw(data, options);
      },

      (err) => { console.log(idName + " error occurred in the subscription", err) },

      () => { console.log(idName + " subscription completed !!!") }
    );
  }

  drawAll() {

    //for (let id of Object.keys(this.dl.chartList)) {
    //  this.drawChart(id);
    //}

    for (let item of this.dl.chartList.getChartList(true)) {
      this.drawChart(item['id']);
    }
  }

  checkSelected(idName: string) {
    return this.dl.chartList.getIdEnable(idName);
  }

  clickedMe(idName: string, add: boolean) {
    //this.dl.chartList[idName].enable = !this.dl.chartList[idName].enable;
    this.dl.chartList.setIdEnable(idName);


    if (add) {
      //this.zone.run(() => {
      //this._sb.openFromComponent(SnackbarSuccessComponent, { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      this._sb.open(idName + " added to Dashboard", null, { duration: 3000, verticalPosition: 'top'});//, "Undo",{ duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      //});
    } else {
      //this._sb.openFromComponent(SnackbarSuccessComponent, { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      this._sb.open(idName + " removed from Dashboard", null, { duration: 3000, verticalPosition: 'top' });
    }
  }

  getCareerLevelFraudStyle() {
    return {
      'margin': '1%',
      'background-color': 'white',
      'display': 'flex',
      'flex-direction': 'column',
      'height.px': (window.innerHeight - this.viewport.elementRef.nativeElement.parentElement.offsetTop)  * .7,
    }
  }

  getIdList() {
    let tempArray = new Array();

    for (let item of this.dl.chartList.getChartList(true)) {
      tempArray.push(item.title);
    }
    return tempArray;
    //return Object.keys(this.dl.chartList.getChartList(true));
  }

  ngAfterViewInit() {
    this.viewport.scrolledIndexChange.subscribe(
      (x) => {
        console.log("ScrolledIndexChange : ", x);
        this.cssArray[x]=true;
        this.cssArray[this.lastScrolledIndex]=false;
        this.lastScrolledIndex = x;
      }
    );

    this.ls.loadScript('googleCharts').then(() => {
      console.log("Google Chart Script got attached to body !!!", google);
      try {

        google.charts.load('current', { 'packages': ['corechart'] }).then(() => {

          console.log("Google Chart packages loaded at ngAfterViewInit!!!", google);

          google.charts.setOnLoadCallback(this.drawAll());
        });
      } catch {
        console.log("could not load google packages at ngAfterViewInit");
      }
    });
    console.log("ngAfterViewInit should be called only once during the component life cycle");
  }

  @HostListener('window:resize', ['$event, { passive: true }'])
  onOrientationChange() {


    for (let id of Object.keys(this.dl.chartList.getChartList(true))) {
      try {
        let myElem = document.getElementById(id);
        myElem.removeChild(myElem.firstChild);
      } catch {
        console.log("Accidental/Rare Exceptions for ", id);
      }
    }
    setTimeout(() => { google.charts.setOnLoadCallback(this.drawAll()); }, 5);

  }

  moveToId(id: string) {
    console.log("moveToId : ", id+"_card");
    let myElem = document.getElementById(id +"_card");
    myElem.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    console.log("moveToId : ", id);
  }

  //toggle(id: string) {

  //  for (var i = 0; i < this.dl.chartList.getChartList(true).length; i++) {
  //    if (this.dl.chartList.getChartList(true)[i].id == id) {
  //      this.dl.chartList.getChartList(true)[i].enable = !this.dl.chartList.getChartList(true)[i].enable;
  //      return;
  //    }
  //  }
  //}

  toggle(id: number) {
    console.log("Before toggle :", this.dl.chartList.getChartList(true)[id].enable);
    this.dl.chartList.getChartList(true)[id].enable = !this.dl.chartList.getChartList(true)[id].enable;
    console.log("After toggle :", this.dl.chartList.getChartList(true)[id].enable);
  }

  //getActiveStatus(id: string) {
  //  for (var i = 0; i < this.dl.chartList.getChartList(true).length; i++) {
  //    if (this.dl.chartList.getChartList(true)[i].id == id) {
  //      return { 'active': this.dl.chartList.getChartList(true)[i].enable };
  //    }
  //  }

  //}

  getActiveStatus(title: string) {
    

    for (var i = 0; i < this.dl.chartList.getChartList(true).length; i++) {
      if (this.dl.chartList.getChartList(true)[i].title == title) {
        //console.log("getActiveStatus :", title, { 'active': this.dl.chartList.getChartList(true)[i].enable });
        return { 'active': this.dl.chartList.getChartList(true)[i].enable }
      }
    }
    
  }

  trackByFunc(index, item) {
    console.log("trackByFunc : ", index, item);
    return item.id;
  }
}
