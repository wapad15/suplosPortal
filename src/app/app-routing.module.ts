import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//rutas de acceso , por defecto pusimos home.
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }, 
  {
    path: 'home',
    loadChildren: () =>
      import('./components/pages/home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'image-list',
    loadChildren: () =>
      import('./components/pages/images/image-list/image-list.module').then(
        (m) => m.ImageListModule
      ),
  },

  {
    path: 'image-details/:id',
    loadChildren: () =>
      import(
        './components/pages/images/image-details/image-details.module'
      ).then((m) => m.ImageDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
