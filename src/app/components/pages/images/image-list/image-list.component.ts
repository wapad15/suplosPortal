import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Params, Router } from '@angular/router';
import { Image } from '@app/shared/interfaces/image.interface';
import { DOCUMENT } from '@angular/common';
import { filter, take } from 'rxjs';
import { ImageService } from '../../../../shared/services/image.service';
type RequestInfo = {
  next: boolean;
};
@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {
  //declaracion de variables 
  images: Image[] = [];
  info: RequestInfo = {
    next: false,
  };
  showGoUpButton = false;
  private pageNum = 1;
  private query: string='';
  private category: string='';
  private hideScrollHeight = 1600;
  private showScrollHeight = 3200;

  constructor(
    @Inject(DOCUMENT) private document:Document,
    private serviceImage: ImageService,
    private route: ActivatedRoute,
    private router: Router,
    ) { 
      this.onUrlChanged();
    }

  ngOnInit(): void {
    this.getImagesByQuery();
    
  }
  
  //estamos en constante escucha del evento scroll y si pasa del tope se habilita el boton mediante el flag showGoUpButton
  @HostListener('window:scroll', [])
  onWindowScroll():void {
    const yOffSet = window.pageYOffset;
    if ((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
      this.onScrollDown();
    } else if (this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  //metodo para hacer una nueva consulta a modo que pareceriera que es un scroll 
  //infinito , este metodo agrega ++ a la variable que usamos para la paginacion y luego llama el metodo de para hacer la consulta 
  onScrollDown():void{
    if (this.info.next= true) {
      this.pageNum++;
      this.getDataFromService();
    }
  }

  //metodo para regresar al top de la pagina
  onScrollTop():void{
    this.document.body.scrollTop = 0; // Safari
    this.document.documentElement.scrollTop = 0; // Other
  }


  // metodo que se usa para estar en escucha por si cambia la url
  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        //reseteamos las variables desde cero y llamamos el metodo de la consulta
        this.images = [];
        this.pageNum = 1;
        this.getImagesByQuery();
      });
  }

  //metodo que llama al metodo que hace la consulta de las imagenes y su informacion 
  //de acuerdo a los parametros que capturemos de la url
  private getImagesByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: Params) => {
      this.query = params['q'];
      this.category = params['category'];
      this.getDataFromService();
    });
  }
  
  //metodo final del flujo que es quien realiza la consulta y por 
  //parametro se le pasan variables previamente cargadas en el flujo 
  //obtinidas de la url  o la variable de paginacion que esta aumentando de acuerdo al scroll
  private getDataFromService(): void {
    this.serviceImage
      .searchImages(this.query, this.pageNum, this.category)
      .pipe(take(1))
      .subscribe((res: any) => {
        //hacemos el llenado solo si se tienen elementos en la 
        //respuesta y si no se tienen no se agregan mas al array
        if (res?.hits?.length) {
          const { hits } = res;
          this.images = [...this.images, ...hits];
          //variable para continuar con el scroll infinito
          this.info.next= true;
        } else {
          this.images = [];
        }
        
      });
  }

}
