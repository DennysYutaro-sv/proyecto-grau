import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import Swal from 'sweetalert2';
import { catchError, Observable, throwError } from 'rxjs';
import { Direccion } from '../colegiados/direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  private urlEndPoint:string= URL_BACKEND + "/api/colegiados";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json' });

  constructor(
    private http:HttpClient,
    private router:Router,
    public authService:AuthService
  ) { }
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer '+ token);
    }
    return this.httpHeaders;
  }
  private isNoAutorizado(e:any):boolean{
    if(e.status == 401){
      this.router.navigate(['/login'])
      return true;
    }
    if(e.status==403){
      Swal.fire('Acceso denegado',`Usuario ${this.authService.usuario.nombre} no tienes acceso a este recurso!`,'warning');
      this.router.navigate(['/clientes'])
      return true;
    }
    return false;
  }
  getDirecciones():Observable<Direccion[]>{
    return this.http.get<Direccion[]>(this.urlEndPoint+`/direcciones`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getDireccion(id:number):Observable<Direccion>{
    return this.http.get<Direccion>(`${this.urlEndPoint}/direcciones/${id}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  saveDireccion(direccion:Direccion):Observable<Direccion>{
    return this.http.post<Direccion>(this.urlEndPoint+`/direcciones`,direccion,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  updateUniversidad(direccion:Direccion):Observable<Direccion>{
    return this.http.put<Direccion>(`${this.urlEndPoint}/direcciones/${direccion.id}`,direccion,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
