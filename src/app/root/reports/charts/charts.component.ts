import { Component, OnInit, ViewChild, ElementRef, HostListener, Input, ChangeDetectorRef, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { DataLoaderService } from '../../../reports/charts/data-loader.service';
import { LoadScriptService } from '../../../load-script.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatBottomSheet, MatBottomSheetRef, MatBottomSheetConfig } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
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
export class ChartsComponent implements OnInit, AfterContentChecked {
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
    private cdref: ChangeDetectorRef,
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
      'margin': '5%',
      'background-color': 'white',
      'display': 'flex',
      'flex-direction': 'column',
      'height.px': window.innerHeight * .8,
    }
  }

  getIdList() {
    return Object.keys(this.dl.chartList.getChartList(true));
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

  scrolled() {
    let offsetDeviation = this.lastScrolledOffset - this.viewport.measureScrollOffset();

    if (Math.abs(offsetDeviation) > 100 && !this.bottomSheetIsOpen) {
      this.bottomSheetIsOpen = true
      console.log(offsetDeviation);
      let config: MatBottomSheetConfig = new MatBottomSheetConfig();
      config.data = {'enable':true}
      this._bottomSheet.open(BottomSheetOverviewExampleSheet, config);
      
      let observer = this._bottomSheet._openedBottomSheetRef.afterDismissed();
      observer.subscribe(() => { }, () => { }, () => { console.log("BottomSheet Closed"); this.bottomSheetIsOpen = false });
    }
    
    this.lastScrolledOffset = this.viewport.measureScrollOffset();
    //console.log("lastScrolledOffset saved"); 
  }

  getDashboard() {
    return false;
  }
  getDl() {
    return this.dl;
  }
  ngAfterContentChecked() {

    //this.sampleViewModel.DataContext = this.DataContext;
    //this.sampleViewModel.Position = this.Position;
    this.cdref.detectChanges();

  }
}


@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet.html',
})
export class BottomSheetOverviewExampleSheet {

  @Input() myParentData;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
    private dl: DataLoaderService
  ) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    //event.preventDefault();
  }

  getChartIds() {
    let ids = new Array();
    for (let item of this.dl.chartList.getChartList(true)) {
      ids.push(item['id']);
    }
    return ids;
  }
  moveToId(id: string) {
    console.log("scrolling",this.myParentData);
    let myElem = document.getElementById(id+"_card");
    myElem.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
    console.log("smooth scrolling done");
    setTimeout(
      ()=>this._bottomSheetRef.dismiss(),
      1000);
  }


}
