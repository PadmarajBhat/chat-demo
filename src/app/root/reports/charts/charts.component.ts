import { Component, OnInit, ViewChild, HostListener, AfterViewInit, Input } from '@angular/core';
import { DataLoaderService } from '../../../reports/charts/data-loader.service';
import { LoadScriptService } from '../../../load-script.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';


declare var google: any;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit, AfterViewInit {
  
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewport: CdkVirtualScrollViewport;

  @Input() isDashboard: boolean;

  lastScrolledIndex: number;
  cssArray = new Array();

  constructor(
    private dl: DataLoaderService,
    private ls: LoadScriptService,
    private _sb: MatSnackBar,
  ) {
  }


  ngOnInit() {
    for (var i = 0; i < this.dl.getChartList(this.isDashboard).length; i++) {
      this.cssArray.push(false);
    }

    console.log("parent input data: isDashboard - ", this.isDashboard);
  }

  deleteCharts() {
    for (let id of Object.keys(this.dl.getChartList(this.isDashboard))) {
      try {
        let myElem = document.getElementById(id+this.isDashboard);
        myElem.removeChild(myElem.firstChild);
      } catch {
        //console.log("Accidental/Rare Exceptions for ", id);
      }
    }
    //setTimeout(() => { }, 100);//wait for a second for all the charts to get deleted.
  }
  
  getCardName(title: string) {
    return title + '_card' + this.isDashboard;
  }

  getCardContentName(idName: string) {
    return idName + this.isDashboard;
  }
  
  drawChart(idName) {
    let subscriber = this.dl.getIdData(idName);
    subscriber.subscribe(
      (x) => {

        console.log("the subscribed value ", x, idName);
        const data = google.visualization.arrayToDataTable(x['data']);
        var options = {
          colors : x['colors']
        };

        let myElem = document.getElementById(idName+this.isDashboard);
        var chart = new google.visualization.PieChart(myElem);
        chart.draw(data, options);
      },

      (err) => { console.log(idName + " error occurred in the subscription", err) },

      () => { }// console.log(idName + " subscription completed !!!") }
    );
  }

  drawAll() {
    this.deleteCharts();
    for (let item of this.dl.getChartList(this.isDashboard)) {
      this.drawChart(item['id']);
      //setTimeout(() => { this.drawChart(item['id']) }, 10);
    }
  }

  checkSelected(idName: string) {
    return this.dl.getIdEnable(idName);
  }

  clickedMe(idName: string, add: boolean) {
    this.dl.setIdEnable(idName);


    if (add) {
      this._sb.open(idName + " added to Dashboard", null, { duration: 3000, verticalPosition: 'top'});
    } else {
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

  @HostListener('window:resize')
  onOrientationChange() {


    this.deleteCharts();
    setTimeout(() => { google.charts.setOnLoadCallback(this.drawAll()); }, 5);

  }

  moveToId(id: string) {
    //console.log("moveToId : ", id+"_card");
    let myElem = document.getElementById(id +"_card");
    myElem.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    //console.log("moveToId : ", id);
  }

  trackByFunc(index, item) {
    console.log("trackByFunc : ", index, item);
    return item.id;
  }

  getMyChartList() {
    //console.log("getMyChartList");
    return this.dl.getChartList(this.isDashboard);
  }
}
