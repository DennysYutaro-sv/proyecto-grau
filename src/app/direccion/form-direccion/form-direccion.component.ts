import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Direccion } from 'src/app/colegiados/direccion';
import { DireccionService } from '../direccion.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-direccion',
  templateUrl: './form-direccion.component.html',
  providers: [MessageService]
})
export class FormDireccionComponent implements OnInit {

  public direccion: Direccion = new Direccion();
  estados = [{nombre:"activo",value:false},{nombre:"desactivo",value:true}];

  constructor(
    public direccionService:DireccionService,
    private activatedRoute : ActivatedRoute,
    private router:Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.cargarDireccion();
  }

  cargarDireccion():void{
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          this.direccionService.getDireccion(id).subscribe(
            (direccion) => 
            {
              this.direccion = direccion
            }
          )
        }
      }
    );
  }

  create():void{
    if(this.direccion.nombre && this.direccion.descripcion ){
      this.direccion.estado = false;
      this.direccionService.saveDireccion(this.direccion).subscribe(direccion =>{
        Swal.fire('Nueva dirección creada',`Dirección ${direccion.nombre}, ha sido creada con éxito!`,'success');
        this.router.navigate(['/direcciones']);
      });
    }
    else{
      this.showError();
    }
  }
  update(){
    if(this.direccion.nombre && this.direccion.descripcion ){
      this.direccionService.updateUniversidad(this.direccion).subscribe(direccion =>{
        Swal.fire('Dirección editada',`Dirección ${direccion.nombre}, ha sido editada con éxito!`,'success');
        this.router.navigate(['/direcciones']);
      });
    }
    else{
      this.showError();
    }
  }

  showError() {
    if(!this.direccion.nombre){
      this.messageService.add({severity:'warn', summary: 'Error: Complete datos', detail: 'El nombre de la dirección es obligatorio, por favor complete.'});
    }
    if(!this.direccion.descripcion){
      this.messageService.add({severity:'warn', summary: 'Error: Complete datos', detail: 'Por favor, describa la dirección.'});
    }
  }

}
