import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Image } from '@app/shared/interfaces/image.interface';

//usamos un template para las cartas que contienen las imagenes
//viene inyectada la variable image que contiene el array para hacer el respectivo llenado por cada imagen
@Component({
    selector:'app-image',
    template:`
    <div class="card">
      <div class="image">
        <a [routerLink]="['/image-details', image.id]">
          <img
            [src]="image.webformatURL"
            [alt]="image.user"
            class="card-img-top"
          />
        </a>
      </div>
      <div class="card-inner">
        <div class="header">
          <a [routerLink]="['/image-details', image.id]">
            <h2>{{ image.tags }}</h2>
          </a>
          <h4 class="text-muted">Views: {{ image.views }}</h4>
          <small class="text-muted">Likes:{{ image.likes }}</small>
        </div>
      </div>
    </div>`,
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class ImageComponent{
    @Input() image: Image;
}