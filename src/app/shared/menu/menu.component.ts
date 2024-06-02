import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from '../../usuarios/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ColegiadoService } from '../../colegiados/colegiado.service';
import { Colegiado } from '../../colegiados/colegiado';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {


  items: MenuItem[]=[];
  colegiados:Colegiado[]=[];

  date = new Date();
  position: string;
  displayPosition: boolean;

  filial:string = '';

  constructor(
    public authService:AuthService,
    private router:Router,
    public colegiadoService:ColegiadoService,
    private primengConfig: PrimeNGConfig
    ) { }

  logout():void{
    Swal.fire('Éxito en cerrar sesión',`Hasta luego ${this.authService.usuario.nombre} ${this.authService.usuario.apellido}, has cerrado sesión con éxito!`,'success');
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.obtenerFilial();
    this.items=[
      {
          label:'Clientes',
          icon:'pi pi-fw pi-users',
          routerLink: '/clientes',
          visible: this.authService.hasRole('ROLE_USER')
      },
    {
      label:'Operaciones CAJA',
      icon:'pi pi-fw pi-cog',
      //routerLink: '/universidades',
      visible: this.authService.hasRole('ROLE_USER'),
      items:[
        {
          label:'PAGAR SERVICIO',
          icon:'pi pi-fw pi-paypal',
          command: ()=> this.rutear(),
          visible: this.authService.hasRole('ROLE_USER')
        },
        {
          label:'Buscar Boleta',
          icon:'pi pi-fw pi-search',
          command: ()=> this.rutear(),
          visible: this.authService.hasRole('ROLE_USER')
        },
        {
          label:'Extornar Boleta',
          icon:'pi pi-fw pi-search-minus',
          command: ()=> this.rutear(),
          visible: this.authService.hasRole('ROLE_USER')
        },
        
        /*
        {
          label:'Cuota',
          icon:'pi pi-fw pi-money-bill',
          command: ()=> this.rutear(),
          visible: this.authService.hasRole('ROLE_USER')
        },
        {
          label:'Tramites',
          icon:'pi pi-fw pi-file',
          routerLink: '/tramites',
          visible: this.authService.hasRole('ROLE_USER')
        },
        {
          label:'Multas',
          icon:'pi pi-fw pi-wallet',
          routerLink: '/multas',
          visible: this.authService.hasRole('ROLE_USER')
        },
        {
          label:'Cursos / Diplomados',
          icon:'pi pi-fw pi-id-card',
          routerLink: '/cursos',
          visible: this.authService.hasRole('ROLE_USER')
        },
        {
          label:'Buscar Boleta',
          icon:'pi pi-fw pi-file',
          routerLink: '/buscar-boleta',
          visible: this.authService.hasRole('ROLE_USER')
        },
        {
          label:'Extornar Boleta',
          icon:'pi pi-fw pi-file-excel',
          routerLink: '/extornos',
          visible: this.authService.hasRole('ROLE_USER')
        },*/
      ]
    },
    {
      label:'Mesa de partes',
      icon:'pi pi-fw pi pi-fw pi-book',
      visible: this.authService.hasRole('ROLE_USER'),
      items:[
        {
          label:'Mantenimiento AGUA',
          icon:'pi pi-fw pi-filter',
          routerLink: '/universidades',
          visible: this.authService.hasRole('ROLE_USER')
        },
        {
          label:'Mantenimiento LIMPIEZA',
          icon:'pi pi-fw pi-trash',
          routerLink: '/universidades',
          visible: this.authService.hasRole('ROLE_USER')
        },
        {
          label:'Mantenimiento TRAMITES',
          icon:'pi pi-fw pi-book',
          routerLink: '/universidades',
          visible: this.authService.hasRole('ROLE_USER')
        },
        {
          label:'Mantenimiento DIRECCIONES',
          icon:'pi pi-fw pi-building',
          routerLink: '/universidades',
          visible: this.authService.hasRole('ROLE_USER')
        },
        {
          label:'Mantenimiento RECIBOS',
          icon:'pi pi-fw pi-copy',
          routerLink: '/universidades',
          visible: this.authService.hasRole('ROLE_USER')
        },
        {
            label:'Registro Clientes',
            icon:'pi pi-fw pi-user-plus',
            routerLink: '/clientes/form',
            visible: this.authService.hasRole('ROLE_ADMIN'),
        },
        {
          label:'Usuarios y Roles internos',
          icon:'pi pi-fw pi-id-card',
          routerLink: '/mantenimiento-usuario',
          visible: this.authService.hasRole('ROLE_USER')
        },
        {
          label:'Generar RECIBOS',
          icon:'pi pi-fw pi-fw pi-book',
          routerLink: '/clientes/form',
          visible: this.authService.hasRole('ROLE_ADMIN'),
      },
        
      ]
    },
    {
      label:'Operador',
      icon:'pi pi-fw pi pi-fw pi-user',
      //routerLink: '/universidades',
      visible: this.authService.hasRole('ROLE_USER'),
      items:[
        {
            label:'MANTENIMIENTO METRO CUBICO',
            icon:'pi pi-fw pi-id-card',
            routerLink: '/mantenimiento-usuario',
            visible: this.authService.hasRole('ROLE_USER')
        }
      ]
    },
    {
      label:'Reportes',
      icon:'pi pi-fw pi-chart-line',
      //routerLink: '/universidades',
      visible: this.authService.hasRole('ROLE_USER'),
      
      items:[
        {
          label:'BOLETAS',
          icon:'pi pi-fw pi-wallet',
          items:[
            {
              label:'Pago de Servicios por día',
              icon:'pi pi-fw pi-money-bill',
              routerLink: 'reportes/cobros',
              visible: this.authService.hasRole('ROLE_USER')
            },
            {
              label:'Pago de Servicios Extornados por día',
              icon:'pi pi-fw pi-fw pi-trash',
              routerLink: 'reportes/cobros',
              visible: this.authService.hasRole('ROLE_USER')
            },
            {
              label:'Pago de Trámites por día',
              icon:'pi pi-fw pi-money-bill',
              routerLink: 'reportes/cobros',
              visible: this.authService.hasRole('ROLE_USER')
            },
            {
              label:'Pago de Trámites Extornados por día',
              icon:'pi pi-fw pi-trash',
              routerLink: 'reportes/extornos',
              visible: this.authService.hasRole('ROLE_USER')
            },
          ]
        },
        {
          label:'NUEVOS CLIENTES',
          icon:'pi pi-fw pi-users',
          items:[
            {
              label:'Incorporaciones del año',
              icon:'pi pi-fw pi-id-card',
              routerLink: 'reportes/historial-pagos',
              visible: this.authService.hasRole('ROLE_USER')
            },
            {
              label:'Incorporaciones Mensual',
              icon:'pi pi-fw pi-id-card',
              routerLink: 'reportes/habilidades',
              visible: this.authService.hasRole('ROLE_USER')
            },
          ]
        },
        /*
        {
          label:'INCORPORACIONES',
          icon:'pi pi-fw pi-chart-line',
          items:[
            {
              label:'Incorporaciones del año',
              icon:'pi pi-fw pi-id-card',
              routerLink: 'reportes/incorporaciones',
              visible: this.authService.hasRole('ROLE_USER')
            },
            {
              label:'Incorporaciones Mensual',
              icon:'pi pi-fw pi-id-card',
              routerLink: 'reportes/incorporaciones-mensual',
              visible: this.authService.hasRole('ROLE_USER')
            },
          ]
        },*/
      ]
    },
    {
      label:'Páginas Web',
      icon:'pi pi-fw pi-globe',
      //routerLink: '/universidades',
      visible: this.authService.hasRole('ROLE_USER'),
      items:[
        {
            label:'Página Web Consulta de RECIBO',
            icon:'pi pi-fw pi-globe',
            command: ()=> this.linkExterno(),
            visible: this.authService.hasRole('ROLE_USER')
        },
        {
          label:'Soporte y Derechos Reservados',
          icon:'pi pi-shield',
          command : ()=> this.mejora(),
          //routerLink: '/universidades',
          visible: this.authService.hasRole('ROLE_USER')
        },
      ]
    },
    {
        label:'Iniciar Sesión',
        icon:'pi pi-fw pi-sign-in',
        routerLink: '/login',
        visible: !this.authService.isAuthenticated()
    },
    {
      label:'Cerrar Sesión',
      icon:'pi pi-fw pi-sign-out',
      visible: this.authService.isAuthenticated(),
      items:[
          {
              label:this.authService.usuario.nombre+' '+this.authService.usuario.apellido,
              icon:'pi pi-fw pi-user'
          },
          {
            label:'FILIAL: '+this.filial,
            icon:'pi pi-fw pi-map-marker'
        },
          {
              separator:true
          },
          {
              label:'Cerrar Sesión',
              icon:'pi pi-fw pi-sign-out',
              command: ()=> this.logout()
          }
      ]
  },
  ];
  //verificar cumple
  this.verificarCumple();
  }
  linkExterno(){
    window.open("https://icacperu.org.pe/","target=_blank") 
  }
  linkExterno1(){
    window.open("https://icac-habilidad.web.app/","target=_blank") 
  }
  linkExterno2(){
    window.open("https://portal.icacperu.org.pe/","target=_blank") 
  }
  verificarCumple(){
    this.colegiadoService.getCumples().subscribe(colegiados => {
      this.colegiados = colegiados;
    })
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
}
rutear(){
  this.router.navigate(['/tramites/form',1]);    
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      window.location.reload();
    }, 10);
  });
}
mejora(){
  Swal.fire({
    title: 'CERTIFICACIÓN DE HABILIDAD DE COLEGIADO',
    text: 'URGENTE: Se requiere el modelo de certificado de HABILIDAD para concluir con la implementación.',
    imageUrl: '/assets/logoyawar.svg',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
    background: '#282C34',
    confirmButtonColor: '#545454'
  })
}
mejora1(){
  Swal.fire({
    title: 'MESA DE PARTES VIRTUAL - ICAC',
    text: 'Nueva funcionalidad disponible.',
    imageUrl: '/assets/logoyawar.svg',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
    background: '#282C34',
    confirmButtonColor: '#545454'
  })
}
obtenerFilial(){
  this.authService.usuario.filial;
  //tiposFilial = [{nombre:"CUSCO",valor:1},{nombre:"QUILLABAMBA",valor:2},{nombre:"ESPINAR",valor:3},{nombre:"SANTA MONICA",valor:4}];
  switch(this.authService.usuario.filial) {
    case 1: {
      this.filial = 'CUSCO'
      break;
    }
    case 2: {
      this.filial = 'QUILLABAMBA'
      break;
    }
    case 3: {
      this.filial = 'ESPINAR'
      break;
    }
    case 4: {
      this.filial = 'SANTA MONICA'
      break;
    }
  }
}
}
