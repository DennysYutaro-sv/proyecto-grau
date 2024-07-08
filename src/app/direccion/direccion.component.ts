import { Component, OnInit } from '@angular/core';
import { Direccion } from '../colegiados/direccion';
import { DireccionService } from './direccion.service';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html'
})
export class DireccionComponent implements OnInit {

  direcciones:Direccion[]=[];
  first = 0;
  rows = 10;

  constructor(
    public direccionService:DireccionService,
    public authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.direccionService.getDirecciones().subscribe(
      (response) =>{
        this.direcciones = response;
      }
      )
  }

  //Ruta
  rutear(direccion:Direccion){
    this.router.navigate(['/direcciones/form',direccion.id]);    
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
