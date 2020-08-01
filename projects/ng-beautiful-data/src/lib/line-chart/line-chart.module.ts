import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line-chart.component';
import { LineComponent } from './line/line.component';

@NgModule({
  declarations: [LineChartComponent, LineComponent],
  imports: [CommonModule],
  exports: [LineChartComponent, LineComponent],
})
export class LineChartModule {}
