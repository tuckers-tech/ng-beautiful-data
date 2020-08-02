export interface LineData {
  plotType: 'line';
  dataType: 'timeseries1d' | 'candlestick';
  data: TimeseriesData1D[] | CandlestickData[];
}

export interface TimeseriesData1D {
  date: string;
  value: number;
}

export interface CandlestickData {
  date: string;
  close: number;
  high: number;
  low: number;
  open: number;
}
