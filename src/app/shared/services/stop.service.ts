import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Stop } from '../models/Stop';

@Injectable({
  providedIn: 'root'
})
export class StopService {
  private stopsCollection: AngularFirestoreCollection<Stop>;

  constructor(private afs: AngularFirestore) {
    this.stopsCollection = this.afs.collection<Stop>('stops');
  }

  getStops(): Observable<Stop[]> {
    return this.stopsCollection.valueChanges();
  }

  getStopsByIds(stopId: any) {
    return this.stopsCollection.doc<Stop>(stopId).valueChanges();
  }

}