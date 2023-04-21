import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Schedule } from '../models/Schedule';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  collectionName = 'Schudules';

  constructor(private afs: AngularFirestore) {

  }

  getAllSchedules(): Observable<Schedule[]> {
    return this.afs.collection<Schedule>(this.collectionName).valueChanges();
  }


  getScheduleByLine(line: string): Observable<Schedule[]> {
    return this.afs.collection<Schedule>(this.collectionName, ref => ref.where('routeName', '==', line)).valueChanges();
  }





}
