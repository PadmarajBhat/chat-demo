import { Component, OnInit, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { DataLoaderService } from '../../../reports/charts/data-loader.service';
import { LoadScriptService } from '../../../load-script.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, transition, style, animate, query, stagger } from '@angular/animations';
import { MatBottomSheet, MatBottomSheetRef, MatBottomSheetConfig } from '@angular/material';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('filterAnimation', [
      transition(':enter', [
        query('*', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
      //transition(':enter, * => 0, * => -1', []),
      //transition(':increment', [
      //  query(':enter', [
      //    style({ opacity: 0, width: '0px' }),
      //    stagger(2500, [
      //      animate('1300ms ease-out', style({ opacity: 1, width: '*' })),
      //    ]),
      //  ], { optional: true })
      //]),
      //transition(':decrement', [
      //  query(':leave', [
      //    stagger(2500, [
      //      animate('1300ms ease-out', style({ opacity: 0, width: '0px' })),
      //    ]),
      //  ])
      //]),
    ])
    //trigger('flyInOut', [
    //  state('in', style({ transform: 'translateX(0)' })),
    //  transition(':enter', [
    //    style({ transform: 'translateX(-100%)' }),
    //    animate(500)
    //  ]),
    //  transition(':leave', [
    //    animate(500, style({ transform: 'translateX(100%)' }))
    //  ])
    //])
  ]
})
export class DashboardComponent implements OnInit {
  @ViewChild('relocationTrend', { static: false }) relocationTrend: ElementRef;

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  viewport: CdkVirtualScrollViewport;

  lastScrolledOffset: number = 0;
  bottomSheetIsOpen: boolean = false;
  fanOut = false;

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

    for (let item of this.dl.chartList.getChartList(false)) {
      this.drawChart(item['id']);
    }
  }

  checkSelected(idName: string) {
    return this.dl.chartList.getIdEnable(idName);
  }

  clickedMe(idName: string, add: boolean) {
    //this.dl.chartList[idName].enable = !this.dl.chartList[idName].enable;
    if (this.checkSelected(idName)) {
      this.fanOut = true;
    }
    this.dl.chartList.setIdEnable(idName);


    if (add) {
      //this.zone.run(() => {
      //this._sb.openFromComponent(SnackbarSuccessComponent, { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      this._sb.open(idName + " added to Dashboard", null, { duration: 3000, verticalPosition: 'top' });//, "Undo",{ duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
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
    return Object.keys(this.dl.chartList.getChartList(false));
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


    for (let id of Object.keys(this.dl.chartList.getChartList(false))) {
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

    if (Math.abs(offsetDeviation) > 100 && !this.bottomSheetIsOpen) {
      this.bottomSheetIsOpen = true
      console.log(offsetDeviation);
      let config: MatBottomSheetConfig = new MatBottomSheetConfig();
      config.data = { 'enable': true }
      this._bottomSheet.open(BottomSheetOverviewExampleSheet1, config);

      let observer = this._bottomSheet._openedBottomSheetRef.afterDismissed();
      observer.subscribe(() => { }, () => { }, () => { console.log("BottomSheet Closed"); this.bottomSheetIsOpen = false });
    }

    this.lastScrolledOffset = this.viewport.measureScrollOffset();
    //console.log("lastScrolledOffset saved"); 
  }
  getDashboard() {
    return true;
  }
  getDl() {
    return this.dl;
  }
}



@Component({
  selector: 'bottom-sheet-overview-example-sheet1',
  templateUrl: '../charts/bottom-sheet.html',
})
export class BottomSheetOverviewExampleSheet1 {

  @Input() myParentData;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet1>,
    private dl: DataLoaderService
  ) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    //event.preventDefault();
  }

  getChartIds() {
    let ids = new Array();
    for (let item of this.dl.chartList.getChartList(false)) {
      ids.push(item['id']);
    }
    return ids;
  }
  moveToId(id: string) {
    console.log("scrolling", this.myParentData);
    let myElem = document.getElementById(id + "_card");
    myElem.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
    console.log("smooth scrolling done");
    setTimeout(
      () => this._bottomSheetRef.dismiss(),
      1000
    );
    
  }


}
