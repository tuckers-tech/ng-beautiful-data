import { LineData } from '../../line-chart/interfaces/line.interface';

export interface LayerData {
  layerType: 'plot' | 'ui' | 'info';
  layerData: LineData[];
}
