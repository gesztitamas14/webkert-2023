import { Component, OnInit } from '@angular/core';
import { GalleryImage } from '../../shared/models/GalleryImage';
import { GalleryService } from '../../shared/services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  galleryImages: Array<GalleryImage> = [];

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.galleryService.loadImageMeta().subscribe(images => {
      this.galleryImages = images;
      //console.log(this.galleryImages);
      this.galleryImages.forEach(image => {
        this.galleryService.loadImage(image.src).subscribe(url => {
          image.src = url;
          //console.log(image.src);
        });
      });
    });
  }
}
