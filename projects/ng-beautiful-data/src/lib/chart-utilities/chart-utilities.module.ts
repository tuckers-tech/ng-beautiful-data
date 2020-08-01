import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayerComponent } from './layer/layer.component';

@NgModule({
  declarations: [LayerComponent],
  imports: [CommonModule],
  exports: [LayerComponent],
})
export class ChartUtilitiesModule {}
