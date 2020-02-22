import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XyzComponent } from './xyz/xyz.component';
import { AbcdComponent } from './abcd/abcd.component';
import { LmnComponent } from './lmn/lmn.component';
//import { ReportsComponent } from './reports/reports.component';
import { CareerlevelfraudtrendComponent } from './reports/charts/careerlevelfraudtrend/careerlevelfraudtrend.component';
import { RecruitedbyComponent } from './reports/charts/recruitedby/recruitedby.component';
//import { CustomersComponent } from './customers/customers.component';

import { MatCommonModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule, MatSnackBarModule, MatBottomSheetModule, MatListModule, MatTabsModule } from '@angular/material';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

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
import { RelocationWiseTrendComponent, PizzaPartyComponent } from './reports/charts/relocation-wise-trend/relocation-wise-trend.component';
import { ChartListComponent } from './reports/chart-list/chart-list.component';
//import { DashboardComponent } from './reports/dashboard/dashboard.component';
import { SnackbarSuccessComponent } from './reports/charts/snackbar-success/snackbar-success.component';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './root/home/home.component';
import { UploadComponent } from './root/upload/upload.component';
import { AnalysisComponent } from './root/analysis/analysis.component';
import { ChartsComponent, BottomSheetOverviewExampleSheet } from './root/reports/charts/charts.component';
import { DashboardComponent, BottomSheetOverviewExampleSheet1 } from './root/reports/dashboard/dashboard.component';
import { ReportsComponent } from './root/reports/reports.component';
import { SideEndDrawComponent } from './root/reports/report-ui/side-end-draw/side-end-draw.component';
import { ScrollCheckComponent } from './scroll-check/scroll-check.component';
import { ChartList } from './root/reports/ChartList';

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
    ViewChildrenComp,
    Pane,
    NpmGoogleChartsComponent,
    ServiceLoadCheckComponent,
    RelocationWiseTrendComponent,
    ChartListComponent,
    DashboardComponent,
    PizzaPartyComponent,
    SnackbarSuccessComponent,
    RootComponent,
    HomeComponent,
    UploadComponent,
    AnalysisComponent,
    ChartsComponent,
    SideEndDrawComponent,
    ScrollCheckComponent,
    BottomSheetOverviewExampleSheet,
    BottomSheetOverviewExampleSheet1,
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
    MatIconModule,
    MatSnackBarModule,
    CustomersModule,
    MatToolbarModule,
    GoogleChartsModule,
    ScrollDispatchModule,
    MatBottomSheetModule,
    MatListModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PizzaPartyComponent, SnackbarSuccessComponent, BottomSheetOverviewExampleSheet, BottomSheetOverviewExampleSheet1]
})
export class AppModule { }
