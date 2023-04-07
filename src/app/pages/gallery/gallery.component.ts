import { Component, OnInit } from '@angular/core';
import { GalleryImage } from '../../shared/models/GalleryImage';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  galleryImages: Array<GalleryImage> = [
    {
      src: './assets/90.jpg',
      alt: '90es busz',
      title: '90'
    },
    {
      src: './assets/90f.jpg',
      alt: '90Fes busz',
      title: '90F'
    },
    {
      src: './assets/74.jpg',
      alt: '74es busz',
      title: '74'
    },
    {
      src: './assets/70.jpg',
      alt: '70es busz',
      title: '70'
    },
    {
      src: './assets/2es.jpg',
      alt: '2es villamos',
      title: '2'
    },
    {
      src: './assets/1es.jpg',
      alt: '1es villamos',
      title: '1'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
