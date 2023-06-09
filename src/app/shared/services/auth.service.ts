import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: any, password: any){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

signup(email: any, password: any){
  return this.auth.createUserWithEmailAndPassword(email,password);
}

  logout(){
    return this.auth.signOut();
  }

  isUserLoggedIn(){
    return  this.auth.user;
  }

  
}
