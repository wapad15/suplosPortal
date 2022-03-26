import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageListComponent } from './image-list.component';

const routes: Routes = [{ path: '', component: ImageListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class ImageListRoutingModule { }
