import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environment/environment';
import { catchError, Observable } from 'rxjs';
import { Image } from '@shared/interfaces/image.interface';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  //servicio para hacer la consulta al api
  //se pueden tener los parametros de query , categoria y paginacion
  searchImages(query ='', page = 1, category: string){
      const filter = `${environment.baseUrlAPI}q=${query}&category=${category}&page=${page}`;
    return this.http.get<Image[]>(filter)
  }

  //servicion para hacer la consulta de imagenes por "id" como parametro
  getDetails(id: number) {
    return this.http.get<Image[]>(`${environment.baseUrlAPI}id=${id}`)
  }
}
