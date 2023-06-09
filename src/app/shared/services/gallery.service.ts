import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GalleryImage } from '../models/GalleryImage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  // HTTP

  collectionName = 'Images';

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private storage: AngularFireStorage    
    ) { }

    loadImageMeta(): Observable<Array<GalleryImage>> {
      return this.afs.collection<GalleryImage>(this.collectionName).valueChanges();
    }
    

  loadImage(imageUrl: string) {
    // return this.http.get(environment.hostUrl + '/assets/' + imageUrl, {responseType: 'blob'});
    return this.storage.ref(imageUrl).getDownloadURL();

  }
}
