import {
  Component,
  OnInit,
  ContentChildren,
  QueryList,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { LineComponent } from '../../line-chart/line/line.component';
import { BehaviorSubject, Subscription, VirtualTimeScheduler } from 'rxjs';
import { LayerData } from '../interfaces/layer.interface';

@Component({
  selector: 'bd-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css'],
})
export class LayerComponent implements OnInit, AfterViewInit, OnDestroy {
  private modelReadySubscription: Subscription;
  public isModelReady = false;
  public isModelReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isModelReady
  );
  @ContentChildren(LineComponent) lines: QueryList<LineComponent>;

  private dataModel: LayerData;

  constructor() {}

  ngOnInit(): void {
    this.modelReadySubscription = this.isModelReady$.subscribe(
      (modelReadyStatus) => {
        this.isModelReady = modelReadyStatus;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.modelReadySubscription) {
      this.modelReadySubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    // This is where the child components are mounted so we need to start watching here for changes to the data model
    this.initalizeDataModel();

    this.lines.forEach((lineComponent, index) => {
      this.dataModel.layerData.push(lineComponent.getDataModel());
    });

    this.readyUpModel();
  }

  public getDataModel(): LayerData {
    return this.dataModel;
  }

  private initalizeDataModel(): void {
    this.dataModel = {
      layerType: 'plot',
      layerData: [],
    };
  }

  readyUpModel(): void {
    this.isModelReady$.next(true);
  }
}
