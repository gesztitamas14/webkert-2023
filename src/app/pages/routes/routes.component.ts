import { Component } from '@angular/core';
import { ScheduleService } from '../../shared/services/schedule.service';

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

  constructor(private scheduleService: ScheduleService) {}

  viewSchedule(line: string) {
    this.selectedLine = line;
    this.showSchedules = true;
    this.scheduleService.getScheduleByLine(line).subscribe((schedules: any[]) => {
      this.schedules = schedules;
      this.showSchedules = true;
      console.log(line)
    });
  }

  goBack() {
    this.showSchedules = false;
    this.selectedLine = null;
  }
}
