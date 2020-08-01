import {
  Component,
  OnInit,
  QueryList,
  AfterViewInit,
  ContentChildren,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { LayerComponent } from '../chart-utilities/layer/layer.component';

@Component({
  selector: 'bd-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, AfterViewInit {
  @ContentChildren(LayerComponent) layers: QueryList<LayerComponent>;

  @ViewChild('lineChart') lineChart: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.lineChart);
    this.layers.forEach((element) => {
      console.log(element);
    });
  }
}
