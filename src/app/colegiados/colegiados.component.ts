import { Component, OnInit } from '@angular/core';
import { Colegiado } from './colegiado';
import { ColegiadoService } from './colegiado.service';
import {TableModule} from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import {MenuItem} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { AuthService } from '../usuarios/auth.service';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-colegiados',
  templateUrl: './colegiados.component.html',
  styleUrls: ['./colegiados.component.css'],
  providers: [MessageService]
})
export class ColegiadosComponent implements OnInit {


  colegiados:Colegiado[]=[];
  term:string="";
  items: MenuItem[];

  constructor(
    public colegiadoService: ColegiadoService,
    public authService:AuthService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    //inyectamos el spinner
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    const storedColegiados = localStorage.getItem('colegiados');
    this.colegiados = JSON.parse(storedColegiados);
    this.items = [
      {
          label: 'Número de DOCUMENTO/DNI',
          icon: 'pi pi-credit-card',
          command: ()=>{this.buscarColegiadoByDni()}
      },
      {
        label: 'Número de SUMINISTRO',
        icon: 'pi pi-users',
        command: ()=>{this.buscarColegiadoBySuministro()}
      },
      {
          label: 'Nombre del CLIENTE',
          icon: 'pi pi-sort-alpha-down',
          command: ()=>{this.buscarColegiadoByNombre()}
      },
      {
          label: 'Número de IDENTIFICADOR',
          icon: 'pi pi-sort-numeric-down',
          command: ()=>{this.buscarColegiadoByColegiatura()}
      }
    ];
    
    
  }
  buscarColegiadoByDni(){
    if(this.term.length==0 || this.term.length!=8){
      //toast
      localStorage.removeItem('colegiados');
      this.messageService.clear();
      this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'VERIFIQUE', detail:'El DNI ingresado no tiene un formato correcto, por favor verifique!!'});

      this.term="";
      this.colegiados=[];
    }
    else{
      this.colegiadoService.getColegiadosByDni(this.term).subscribe(
        (response)=>{
          this.colegiados=response;
          localStorage.removeItem('colegiados');
          localStorage.setItem('colegiados', JSON.stringify(this.colegiados));
          if(this.colegiados.length==0){
            //toast
            this.messageService.clear();
            this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'NO EXISTE', detail:'El DNI del colegiado ingresado no existe en nuestra base de datos, por favor verifique!!'});
            
            this.term="";
            this.colegiados=[];
          }
        }
      )
    }
  }
  buscarColegiadoBySuministro(){
    if(this.term.length==0){
      localStorage.removeItem('colegiados');
      //toast
      this.messageService.clear();
      this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'ERROR', detail:'Tiene que ingresar el suministro a buscar, por favor verifique!!'});

      this.term="";
      this.colegiados=[];
    }
    else{
      this.colegiadoService.getColegiadosBySuministro(this.term).subscribe(
        (response)=>{
          localStorage.removeItem('colegiados');
          localStorage.setItem('colegiados', JSON.stringify(this.colegiados));
          this.colegiados=response;
          
          if(this.colegiados.length==0){
            localStorage.removeItem('colegiados');

            //toast
            this.messageService.clear();
            this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'NO EXISTE', detail:'El suministro ingresado no existe en nuestra base de datos, por favor verifique!!'});

            this.term="";
            this.colegiados=[];
          }
        }
      )
    }
  }
  buscarColegiadoByNombre(){
    if(this.term.length==0){
      localStorage.removeItem('colegiados');
      //toast
      this.messageService.clear();
      this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'ERROR', detail:'Tiene que ingresar el nombre a buscar, por favor verifique!!'});

      this.term="";
      this.colegiados=[];
    }
    else{
      this.colegiadoService.getColegiadosByNombre(this.term).subscribe(
        (response)=>{
          this.colegiados=response;
          localStorage.removeItem('colegiados');
          localStorage.setItem('colegiados', JSON.stringify(this.colegiados));
          if(this.colegiados.length==0){

            //toast
            this.messageService.clear();
            this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'NO EXISTE', detail:'El nombre del colegiado ingresado no existe en nuestra base de datos, por favor verifique!!'});

            this.term="";
            this.colegiados=[];
          }
        }
      )
    }
  }
  buscarColegiadoByColegiatura(){
    if(this.term.length==0){
      localStorage.removeItem('colegiados');
      //toast
      this.messageService.clear();
      this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'ERROR', detail:'Tiene que ingresar el número de colegiatura a buscar, por favor verifique!!'});

      this.term="";
      this.colegiados=[];
    }
    else{
      this.colegiadoService.getColegiadosByColegiatura(this.term).subscribe(
        (response)=>{
          this.colegiados=response;
          localStorage.removeItem('colegiados');
          localStorage.setItem('colegiados', JSON.stringify(this.colegiados));
          if(this.colegiados.length==0){

            //toast
            this.messageService.clear();
            this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'NO EXISTE', detail:'El número de colegiatura ingresado no existe en nuestra base de datos, por favor verifique!!'});

            this.term="";
            this.colegiados=[];
          }
        }
      )
    }
  }

  //Toast
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
  }
  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
      this.messageService.clear('c');
  }

}
