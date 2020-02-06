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

]
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
