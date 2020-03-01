import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XyzComponent } from './xyz/xyz.component';
//import { ReportsComponent } from './reports/reports.component';
import { CareerlevelfraudtrendComponent } from './reports/charts/careerlevelfraudtrend/careerlevelfraudtrend.component';
import { RecruitedbyComponent } from './reports/charts/recruitedby/recruitedby.component';
import { LmnComponent } from './lmn/lmn.component';
import { CustomersComponent } from './customers/customers.component';
import { WidthCheckComponent } from './width-check/width-check.component';
import { AppLookComponent } from './app-look/app-look.component';
import { ButtonsComponent } from './reports/charts/buttons/buttons.component';
import { ViewChildrenComp } from './view-child/view-child.component';
import { NpmGoogleChartsComponent } from './reports/charts/npm-google-charts/npm-google-charts.component';
import { ServiceLoadCheckComponent } from './reports/charts/service-load-check/service-load-check.component';

import { ChartListComponent } from './reports/chart-list/chart-list.component';
//import { DashboardComponent } from './reports/dashboard/dashboard.component';
import { HomeComponent } from './root/home/home.component';
import { UploadComponent } from './root/upload/upload.component';
import { AnalysisComponent } from './root/analysis/analysis.component';

import { ChartsComponent } from './root/reports/charts/charts.component';
import { RootComponent } from './root/root.component';
import { ReportsComponent } from './root/reports/reports.component';
import { ScrollCheckComponent } from './scroll-check/scroll-check.component';
import { NavigationScrollCheckComponent } from './navigation-scroll-check/navigation-scroll-check.component';


const routes: Routes = [
  {path:"", component:LmnComponent},
  { path: 'xyz', component: XyzComponent },
  {
    path: 'reports', component: ReportsComponent,
    children: [
      { path: "careerlevel", component: CareerlevelfraudtrendComponent },
      { path: "recruitedby", component: RecruitedbyComponent },
    ]
  },
  { path: "customers", component: CustomersComponent },
  { path: "width", component: WidthCheckComponent },
  { path: "app", component: AppLookComponent },
  { path: "buttons", component: ButtonsComponent },
  { path: "child", component: ViewChildrenComp },
  //{ path: "charts", component: NpmGoogleChartsComponent },
  { path: "service", component: ServiceLoadCheckComponent },

  { path: "charts", component: ChartListComponent },
  {
    path: "root", component: RootComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "upload", component: UploadComponent },
      { path: "analysis", component: AnalysisComponent },
      {
        path: "reports", component: ReportsComponent,
      }
    ]

  },
  { path: "scroll", component: ScrollCheckComponent },
  {path:"navcheck",component:NavigationScrollCheckComponent},


]
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
