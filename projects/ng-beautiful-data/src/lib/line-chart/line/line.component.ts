import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Subscription, throwError } from 'rxjs';
import {
  LineData,
  TimeseriesData1D,
  CandlestickData,
} from '../interfaces/line.interface';

export function isTimeseries1D(obj): boolean {
  return typeof obj.date === 'string' && typeof obj.value === 'number';
}
export function isCandlestickData(obj): boolean {
  return (
    typeof obj.date === 'string' &&
    typeof obj.close === 'number' &&
    typeof obj.high === 'number' &&
    typeof obj.low === 'number' &&
    typeof obj.open === 'number'
  );
}

@Component({
  selector: 'bd-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css'],
})
export class LineComponent implements OnInit, OnDestroy {
  @Input() data: TimeseriesData1D[] | CandlestickData[];

  modelReadySub: Subscription;
  public isModelReady = false;
  public isModelReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isModelReady
  );

  public dataModel: LineData;

  constructor() {}

  ngOnInit(): void {
    this.modelReadySub = this.isModelReady$.subscribe((modelReadyStatus) => {
      this.isModelReady = modelReadyStatus;
    });
    if (this.data.length > 0) {
      this.dataModel = this.buildDataModel(
        this.determineDataModel(this.data[0]),
        this.data
      );
      this.readyUpModel();
    } else {
      console.error('No Data Provided');
    }
  }

  ngOnDestroy(): void {
    if (this.modelReadySub) {
      this.modelReadySub.unsubscribe();
    }
  }

  public getDataModel(): LineData {
    return this.dataModel;
  }

  private readyUpModel(): void {
    this.isModelReady$.next(true);
  }

  private determineDataModel(
    rawData: TimeseriesData1D | CandlestickData
  ): 'timeseries1d' | 'candlestick' {
    if (isCandlestickData(rawData)) {
      return 'candlestick';
    } else {
      return 'timeseries1d';
    }
  }

  private buildDataModel(
    dataType: 'timeseries1d' | 'candlestick',
    data: TimeseriesData1D[] | CandlestickData[]
  ): LineData {
    return {
      plotType: 'line',
      dataType,
      data,
    };
  }
}
