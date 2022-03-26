import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';

import { ImageService } from '../../../../shared/services/image.service';
import {Location} from '@angular/common';
import { Image } from '@app/shared/interfaces/image.interface';
@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {
  images: Image[] = [];
  constructor(
    private route:ActivatedRoute, 
    private imageSvc: ImageService,
     private location: Location) { }

     ngOnInit(): void {
       //Capturamos el parametro ID desde la URl
      this.route.params.pipe( take(1)).subscribe((params) => {
        const id = params['id'];
        
        //consultamos en el servicio y pasamos por parametro el id de la url para obtener los datos y los guardamos en images
        this.imageSvc.getDetails(id).subscribe(
          (res: any)=>{
            if (res?.hits?.length) {
              const { hits } = res;
              this.images =[...this.images, ...hits];
            }
            
          }
        )
        
      });
    }
  
    onGoBack():void{
      this.location.back();
    }
}
