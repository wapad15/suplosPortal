import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { ImageListComponent } from './image-list/image-list.component';
import { RouterModule } from '@angular/router';
import { ImageComponent } from './image.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const myComponents = [ImageDetailsComponent, ImageListComponent,ImageComponent]

@NgModule({
  declarations: [...myComponents],
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule
  ],
  exports:[...myComponents]
})
export class ImagesModule { }
