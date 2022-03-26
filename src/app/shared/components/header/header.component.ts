import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //objeto para saber la categoria seleccionada
  public selectedCategory = {
    id: null,
    name: null
  }


  //array de categorias que simula como si viniera de un api
  public categorys = [
    {
      id: "science",
      name:"science"
    },
    {
      id: "education",
      name:"education"
    },
    {
      id: "people",
      name:"people"
    },
    {
      id: "feelings",
      name:"feelings"
    },
    {
      id: "computer",
      name:"computer"
    },
    {
      id: "buildings",
      name:"buildings"
    }
  ]
  private query: string='';
  constructor(private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }
    
  //metodo para saber cuando se selecciono una categoria y hacemos la navegacion 
  //hasta el list y mandamos por parametros la id de la categoria 
  public onSelect(category:any){
    this.router.navigate(['/image-list'], {
      queryParams: { category: category },
    });
  
  }
}
