import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DataLoaderService } from '../data-loader.service';
import { LoadScriptService } from '../../../load-script.service';
import { SnackbarSuccessComponent } from '../snackbar-success/snackbar-success.component';



declare var google: any;
declare var googler: any;

@Component({
  selector: 'snack-bar-component-example-snack',
  styles: [`

    .example-pizza-party {
      color: hotpink;
    }
  `],
  template: `<span style="background-color:green"> Hello </span>`

})
export class PizzaPartyComponent { }

@Component({
  selector: 'app-relocation-wise-trend',
  templateUrl: './relocation-wise-trend.component.html',
  styleUrls: ['./relocation-wise-trend.component.css']
})
export class RelocationWiseTrendComponent implements OnInit {

  @ViewChild('relocationTrend', { static: false }) relocationTrend: ElementRef;

  
  constructor(
    private dl: DataLoaderService,
    private ls: LoadScriptService,
    private _sb: MatSnackBar,
    private zone: NgZone,
  ) { }


  ngOnInit() {
  }

  drawChart(idName) {
    let subscriber = this.dl.getIdData(idName);
    subscriber.subscribe(
      (x) => {

        console.log("the subscribed value ", x);
        const data = google.visualization.arrayToDataTable(x);
        var options = {
          title: this.dl.chartList[idName].title,
        };

        let myElem = document.getElementById(idName);
        var chart = new google.visualization.PieChart(myElem);
        chart.draw(data, options);
      },

      (err) => { console.log(idName + " error occurred in the subscription", err) },

      () => { console.log(idName+" subscription completed !!!") }
    );
  }

  drawAll() {

    for (let id of Object.keys(this.dl.chartList)) {
      this.drawChart(id);
    }
    
  }

  checkSelected(idName: string) {
    return this.dl.chartList[idName].enable;
  }

  clickedMe(idName: string, add: boolean) {
    //this.dl.chartList[idName].enable = !this.dl.chartList[idName].enable;
    this.dl.setEnableId(idName);

    
    if (add) {
      //this.zone.run(() => {
      this._sb.openFromComponent(SnackbarSuccessComponent,  { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      //this._sb.open(idName + " added to Dashboard", null, { duration: 3000, verticalPosition: 'top'});//, "Undo",{ duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      //});
    } else {
      //this._sb.openFromComponent(SnackbarSuccessComponent, { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      this._sb.open(idName + " removed from Dashboard", null, { duration: 3000, verticalPosition: 'top'});
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
    return Object.keys(this.dl.chartList);
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


    for (let id of Object.keys(this.dl.chartList)) {
      try {
        let myElem = document.getElementById(id);
        myElem.removeChild(myElem.firstChild);
      } catch {
        console.log("Accidental/Rare Exceptions for ", id);
      }
    } 
    setTimeout(() => { google.charts.setOnLoadCallback(this.drawAll()); }, 5);

  }


}



