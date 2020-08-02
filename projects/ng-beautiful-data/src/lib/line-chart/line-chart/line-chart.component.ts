import {
  Component,
  OnInit,
  QueryList,
  AfterViewInit,
  ContentChildren,
  ViewChild,
  ElementRef,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { LayerComponent } from '../../chart-utilities/layer/layer.component';
import { Subscription, BehaviorSubject } from 'rxjs';
import { LineChartData } from '../interfaces/line-chart.interface';

@Component({
  selector: 'bd-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ContentChildren(LayerComponent) layers: QueryList<LayerComponent>;

  @ViewChild('lineChart') lineChart: ElementRef<HTMLCanvasElement>;

  layerStatus$: Subscription[] = [];
  layerStatus: boolean[] = [];

  dataModel: LineChartData;

  dataModelReady = false;
  isDataModelReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.dataModelReady
  );

  isDataModelReadySub: Subscription;

  context: CanvasRenderingContext2D;
  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.isDataModelReadySub = this.isDataModelReady$.subscribe(
      (modelReadyStatus) => {
        this.dataModelReady = modelReadyStatus;
        if (this.dataModelReady) {
        }
        console.log(this.dataModel);
      }
    );
  }

  ngAfterViewInit(): void {
    this.context = this.lineChart.nativeElement.getContext('2d');

    this.layers.forEach((element, index) => {
      this.layerStatus$.push(
        element.isModelReady$.subscribe((status) => {
          this.layerStatus[index] = status;
          if (this.allChildrenReady()) {
            // get all data and stop watching layer status
            this.buildPlotDataModel();
          }
        })
      );
    });

    // this.runEventLoop();
  }

  ngOnDestroy(): void {
    // Unsubscribe from model status for every layer
    this.stopWatchingLayerStatus();
    this.stopWatchingDataModelStatus();
  }

  private buildPlotDataModel(): void {
    this.dataModel = {
      layerData: [],
    };

    this.layers.forEach((layer) => {
      this.dataModel.layerData.push(layer.getDataModel());
    });

    this.isDataModelReady$.next(true);

    this.stopWatchingLayerStatus();
  }

  private stopWatchingLayerStatus(): void {
    this.layerStatus$.forEach((element) => {
      if (element) {
        element.unsubscribe();
      }
    });
  }

  private allChildrenReady(): boolean {
    return (
      this.layerStatus.reduce((a, b) => (a ? 1 : 0) + (b ? 1 : 0), 0) ===
      this.layers.length
    );
  }

  private runEventLoop(): void {
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  private animate(): void {
    const animFrame = requestAnimationFrame(this.animate.bind(this));
    console.log('Animation Frame');
  }

  private readyUpDataModel(): void {
    this.dataModelReady = true;
  }

  private stopWatchingDataModelStatus(): void {
    if (this.isDataModelReadySub) {
      this.isDataModelReadySub.unsubscribe();
    }
  }
}
