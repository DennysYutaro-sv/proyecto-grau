import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Agua } from '../agua';
import { AguaService } from '../agua.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TramiteService } from 'src/app/tramites/services/tramite.service';
import { Tramite } from 'src/app/facturas/models/tramite';

@Component({
  selector: 'app-form-agua',
  templateUrl: './form-agua.component.html',
  providers: [MessageService]
})
export class FormAguaComponent implements OnInit {

  public tramite:Tramite = new Tramite();

  constructor(
    public tramiteService: TramiteService,
    private activatedRoute : ActivatedRoute,
    private router:Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.cargarTramite();
  }
  cargarTramite():void{
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          this.tramiteService.getTramite(id).subscribe(
            (tramite) => 
            {
              this.tramite = tramite
            }
          )
        }
      }
    );
  }

  create():void{
    if(this.tramite.nombre && this.tramite.descripcion && this.tramite.precio ){
      this.tramite.tipo = "agua"
      this.tramiteService.saveTramite(this.tramite).subscribe(tramite =>{
        Swal.fire('Nueva tarida creada',`Tarifa de Agua ${tramite.nombre}, ha sido creada con éxito!`,'success');
        this.router.navigate(['/manteniento-agua']);
      });
    }
    else{
      this.showError();
    }
  }
  update(){
    if(this.tramite.nombre && this.tramite.descripcion && this.tramite.precio ){
      this.tramiteService.updateTramite(this.tramite).subscribe(tramite =>{
          Swal.fire('Tarifa editada',`Tarifa de Agua ${tramite.nombre}, ha sido editado con éxito!`,'success');
          this.router.navigate(['/manteniento-agua']);
      });
    }
    else{
      this.showError();
    }
  }

  showError() {
    if(!this.tramite.nombre){
      this.messageService.add({severity:'warn', summary: 'Error: Complete datos', detail: 'El nombre de la Tarifa de Agua es obligatoria, por favor complete.'});
    }
    if(!this.tramite.precio){
      this.messageService.add({severity:'warn', summary: 'Error: Complete datos', detail: 'El precio de la Tarifa de Agua es obligatoria, por favor complete.'});
    }
    if(!this.tramite.descripcion){
      this.messageService.add({severity:'warn', summary: 'Error: Complete datos', detail: 'Por favor, describa la Tarifa de Agua.'});
    }
  }
}
