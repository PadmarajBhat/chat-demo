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

import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    XyzComponent,
    AbcdComponent,
    LmnComponent,
    ReportsComponent,
    CareerlevelfraudtrendComponent,
    RecruitedbyComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatSidenavModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
