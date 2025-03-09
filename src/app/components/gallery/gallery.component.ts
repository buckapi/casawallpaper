import { Component, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from '@app/services/global.service';
import { virtualRouter } from '@app/services/virtualRouter.service';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import { CommonModule } from '@angular/common';
import { DataApiService } from '@app/services/data-api-service';
import PocketBase from 'pocketbase';
import { RealtimeImagesService } from '@app/services/realtime-images.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ReactiveFormsModule, PhotoGalleryModule, CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements AfterViewInit {
  images: any[] = [];

  constructor (
    public global: GlobalService,
    public virtualRouter: virtualRouter,
    public dataApiService: DataApiService,
    public realtimeImages: RealtimeImagesService
  ){
    this.realtimeImages.images$.subscribe((images) => {
      this.images = images;
    });
  }
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
  
}
