import { Component } from '@angular/core';
import { DataService, CloseData } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  lineData: CloseData[];
  constructor(private dataService: DataService) {
    this.lineData = dataService.getClose();
  }
}
