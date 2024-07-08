import { Component, OnInit } from '@angular/core';
import { Tramite } from '../facturas/models/tramite';
import { TramiteService } from '../tramites/services/tramite.service';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-limpiezas',
  templateUrl: './limpiezas.component.html',
  styleUrls: ['./limpiezas.component.css']
})
export class LimpiezasComponent implements OnInit {

  tramites: Tramite[] = [];
  displayMaximizable: boolean;
  first = 0;
  rows = 10;
  c=0;
  n=0;

  tramitex:Tramite =
  {
    id:0,
    nombre:'',
    descripcion:'',
    precio:0,
    tipo:''
  };

  constructor(
    public tramiteService:TramiteService,
    public authService:AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.tramiteService.getTramitesNombre('limpieza').subscribe(
      (tramites) =>{
        this.tramites = tramites;
        tramites.forEach((t) => {
          this.c=this.c+1
          t.modalidad=this.c.toString();
        });
      }
    )
  }
  //Ruta
  rutear(agua:Tramite){
    this.router.navigate(['/manteniento-limpieza/form',agua.id]);    
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        window.location.reload();
      }, 10);
    });
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

}
