import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Schedule } from '../../shared/models/Schedule';
import { Stop } from '../../shared/models/Stop';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private schedulesCollection: AngularFirestoreCollection<Schedule>;

  constructor(private afs: AngularFirestore) {
    this.schedulesCollection = this.afs.collection<Schedule>('schedules');
  }

  getAllSchedules() {
    return this.schedulesCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          //console.log(data);
          //console.log(id);
          
          const stop1 = data.stop1;
          const stop2 = data.stop2;
          const stop3 = data.stop3;
          const stop4 = data.stop4;
          console.log(stop1);
          const stops = [stop1, stop2, stop3, stop4].filter((stop) => stop !== null);
          return { ...data, stops, id };

        })
      )
    );
  }

  getScheduleById(scheduleId: string) {
    return this.schedulesCollection
      .doc<Schedule>(scheduleId)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data() as Schedule;
          const id = a.payload.id;
          const stops = data.stops.map(
            (stop) => ({ ...stop } as Stop)
          );
          return { ...data, stops, id };
        })
      );
  }

  getScheduleByLine(line: string) {
    return this.getAllSchedules().pipe(
      map((schedules) =>
        schedules.filter((schedule) => schedule.routeName === line)
      )
    );
  }

  
}
