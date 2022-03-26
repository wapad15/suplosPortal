import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

//de usa un pequeño template para hcer el imput que busca por palabras ingresadas"
@Component({
  selector: 'app-form-search',
  template: `
    <input
      #inputSearch
      autofocus
      type="text"
      class="form-control-lg"
      placeholder="Search......"
      (keyup)="onSearch(inputSearch.value)"
    />
  `,
  styles: ['input {width:100%}'],
})
export class FormSearchComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

//metodo usado cuando se detecta que se escribe en el impunt 
  onSearch(value: string) {
    //solo cambia la url si supera mas de 3 en query escrito por el usuario
    //y si es asi hacemos la navegacion y pasamos por parametro el query
    if (value && value.length > 3) {
      this.router.navigate(['/image-list'], {
        queryParams: { q: value },
      });
    }
  }

}
