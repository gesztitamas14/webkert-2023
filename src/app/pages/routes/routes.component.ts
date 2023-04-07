import { Component } from '@angular/core';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent {
  schedules: any[] = [];
  showSchedules: boolean = false;
  tramLines: any[] = ['1', '2', '4'];
  busLines: any[] = ['90', '90F', '74', '70'];
  selectedLine: any = null;

  viewSchedule(line: number) {
    this.showSchedules = true;
    this.selectedLine = line;
    // Replace the following with actual data for the selected line
    this.schedules = [
      { from: 'A', to: 'B', fromTime: '10:00', toTime: '11:00' },
      { from: 'B', to: 'C', fromTime: '11:00', toTime: '12:00' },
      { from: 'C', to: 'D', fromTime: '12:00', toTime: '13:00' },
      { from: 'D', to: 'E', fromTime: '13:00', toTime: '14:00' }
    ];
  }

  goBack() {
    this.showSchedules = false;
    this.selectedLine = null;
    this.schedules = [];
  }
}
