import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  collectionName = 'Users';

  //CRUD
  create(user:User){
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAll(){

  }

  update(){

  }

  delete(){

  }
}
