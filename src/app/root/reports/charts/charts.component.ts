import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataLoaderService } from '../../../reports/charts/data-loader.service';
import { LoadScriptService } from '../../../load-script.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
//import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';

declare var google: any;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @ViewChild('relocationTrend', { static: false }) relocationTrend: ElementRef;

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  viewport: CdkVirtualScrollViewport;

  lastScrolledOffset: number = 0;
  bottomSheetIsOpen: boolean = false;

  constructor(
    private dl: DataLoaderService,
    private ls: LoadScriptService,
    private _sb: MatSnackBar,
    private _bottomSheet: MatBottomSheet,
  ) { }


  ngOnInit() {
  }

  drawChart(idName) {
    let subscriber = this.dl.getIdData(idName);
    subscriber.subscribe(
      (x) => {

        console.log("the subscribed value ", x);
        const data = google.visualization.arrayToDataTable(x['data']);
        //var options = {
        //  title: this.dl.chartList[idName].title,
        //};

        var options = {};

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

    for (let item of this.dl.chartList.getChartList()) {
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
      'margin': '5%',
      'background-color': 'white',
      'display': 'flex',
      'flex-direction': 'column',
      'height.px': window.innerHeight * .8,
    }
  }

  getIdList() {
    return Object.keys(this.dl.chartList.getChartList());
  }

  ngAfterViewInit() {
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


    for (let id of Object.keys(this.dl.chartList.getChartList())) {
      try {
        let myElem = document.getElementById(id);
        myElem.removeChild(myElem.firstChild);
      } catch {
        console.log("Accidental/Rare Exceptions for ", id);
      }
    }
    setTimeout(() => { google.charts.setOnLoadCallback(this.drawAll()); }, 5);

  }

  scrolled() {
    let offsetDeviation = this.lastScrolledOffset - this.viewport.measureScrollOffset();

    if (Math.abs(offsetDeviation) > 25 && !this.bottomSheetIsOpen) {
      this.bottomSheetIsOpen = true
      console.log(offsetDeviation);
      this._bottomSheet.open(BottomSheetOverviewExampleSheet);
      let observer = this._bottomSheet._openedBottomSheetRef.afterDismissed();
      observer.subscribe(() => { }, () => { }, () => { console.log("BottomSheet Closed"); this.bottomSheetIsOpen = false });
    }
    
    this.lastScrolledOffset = this.viewport.measureScrollOffset();
    //console.log("lastScrolledOffset saved"); 
  }


}


@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet.html',
})
export class BottomSheetOverviewExampleSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
    private dl: DataLoaderService
  ) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    //event.preventDefault();
  }

 getChartIds() {
        var tempList = new Array();
        for (let id of Object.keys(this.dl.chartList)) {
          if (!this.dl.chartList[id].enable) {
            tempList.push(id)
          }
        }
        return tempList;
  }
  moveToId(id: string) {
    console.log("scrolling");
    let myElem = document.getElementById(id);
    myElem.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    console.log("smooth scrolling done");
  }
}
