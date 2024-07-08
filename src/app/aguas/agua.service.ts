import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import Swal from 'sweetalert2';
import { Agua } from './agua';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AguaService {
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
      Swal.fire('Acceso denegado',`Usuario ${this.authService.usuario.nombre} ${this.authService.usuario.apellido} no tienes acceso a este recurso!`,'warning');
      this.router.navigate(['/clientes'])
      return true;
    }
    return false;
  }
  getAguas():Observable<Agua[]>{
    return this.http.get<Agua[]>(this.urlEndPoint+`/aguas`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getAgua(id:number):Observable<Agua>{
    return this.http.get<Agua>(`${this.urlEndPoint}/aguas/${id}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  saveAgua(agua:Agua):Observable<Agua>{
    return this.http.post<Agua>(this.urlEndPoint+`/aguas`,agua,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  updateAgua(agua:Agua):Observable<Agua>{
    return this.http.put<Agua>(`${this.urlEndPoint}/aguas/${agua.id}`,agua,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
