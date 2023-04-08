import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Feedback } from '../models/Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  collectionName = 'Feedbacks';


  constructor(private afs: AngularFirestore) { }

  create(feedback: Feedback){
    feedback.id = this.afs.createId();
    return this.afs.collection<Feedback>(this.collectionName).doc(feedback.id).set(feedback);
  }

  getAll(){
    return this.afs.collection<Feedback>(this.collectionName).valueChanges();
  }

  update(){

  }

  delete(){

  }
}
