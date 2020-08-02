import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LineChartModule } from '../../../ng-beautiful-data/src/lib/line-chart/line-chart.module';
import { ChartUtilitiesModule } from '../../../ng-beautiful-data/src/lib/chart-utilities/chart-utilities.module';

import { DataService } from './data.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LineChartModule,
    ChartUtilitiesModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
