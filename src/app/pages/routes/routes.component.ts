import {Component} from '@angular/core';
import {ScheduleService} from '../../shared/services/schedule.service';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent {
  schedules: any[] = [];
  showSchedules: boolean = false;
  tramLines: any[] = ['1', '2'];
  busLines: any[] = ['90', '90F', '74', '70'];
  selectedLine: any = null;

  constructor(private scheduleService: ScheduleService, private dateFormatPipe: DateFormatPipe) {
  }

  viewSchedule(line: string) {
    this.selectedLine = line;
    this.showSchedules = true;
    this.scheduleService.getScheduleByLine(line).subscribe(schedules => {
      //console.log(schedules);
      this.schedules = [];
      const schedule = schedules[0];
      const stopEntries = Object.entries(schedule.stops);
      for (let i = 0; i < stopEntries.length; i++) {
        const [stopName, time] = stopEntries[i];
        const stop = {name: stopName, time: time+"'"};
        this.schedules.push(stop);
      }
      this.schedules.sort((b, a) => (parseInt(a.time) < parseInt(b.time)) ? 1 : -1);

    });
  }

  getDelayMessage(): string {
    const today = new Date();
    const twoDaysLater = new Date();
    twoDaysLater.setDate(today.getDate() + 2);

    const todayFormatted = this.dateFormatPipe.transform(today);
    const twoDaysLaterFormatted = this.dateFormatPipe.transform(twoDaysLater);

    return `A mai naptól (${todayFormatted}) a következő két napig (${twoDaysLaterFormatted}-ig) a buszok és villamosok késésére számíthatnak.`;
  }



  goBack() {
    this.showSchedules = false;
    this.selectedLine = null;
  }
}
