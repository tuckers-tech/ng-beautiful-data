import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LineChartModule, ChartUtilitiesModule } from 'ng-beautiful-data';

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
