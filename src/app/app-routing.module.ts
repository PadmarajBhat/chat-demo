import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XyzComponent } from './xyz/xyz.component';
import { ReportsComponent } from './reports/reports.component';
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
  { path: "charts", component: NpmGoogleChartsComponent },
  { path: "service", component: ServiceLoadCheckComponent },
  
]
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
