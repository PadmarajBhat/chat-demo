import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XyzComponent } from './xyz/xyz.component';
import { AbcdComponent } from './abcd/abcd.component';
import { LmnComponent } from './lmn/lmn.component';
import { ReportsComponent } from './reports/reports.component';
import { CareerlevelfraudtrendComponent } from './reports/charts/careerlevelfraudtrend/careerlevelfraudtrend.component';
import { RecruitedbyComponent } from './reports/charts/recruitedby/recruitedby.component';
//import { CustomersComponent } from './customers/customers.component';

import { MatCommonModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';
import { CustomersModule } from './customers/customers.module';
import { WidthCheckComponent } from './width-check/width-check.component';
import { AppLookComponent } from './app-look/app-look.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonsComponent } from './reports/charts/buttons/buttons.component';
import { Pane, ViewChildrenComp } from './view-child/view-child.component';
import { NpmGoogleChartsComponent } from './reports/charts/npm-google-charts/npm-google-charts.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ServiceLoadCheckComponent } from './reports/charts/service-load-check/service-load-check.component';
import { RelocationWiseTrendComponent } from './reports/charts/relocation-wise-trend/relocation-wise-trend.component';
import { ChartListComponent } from './reports/chart-list/chart-list.component';
import { DashboardComponent } from './reports/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    XyzComponent,
    AbcdComponent,
    LmnComponent,
    ReportsComponent,
    CareerlevelfraudtrendComponent,
    RecruitedbyComponent,
    WidthCheckComponent,
    AppLookComponent,
    ButtonsComponent,
    ViewChildrenComp, Pane, NpmGoogleChartsComponent, ServiceLoadCheckComponent, RelocationWiseTrendComponent, ChartListComponent, DashboardComponent,
    
    //CustomersComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatCommonModule,
    HttpClientModule,
    MatButtonModule,
    CustomersModule,
    MatToolbarModule,
    GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
