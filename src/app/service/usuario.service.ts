import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import {
  RegisterForm,
  LoginForm,
  CargarUsuarios
} from '../interfaces/interfaces';
import { Usuario } from '../models/usuarios.model';

const base_url = environment.base_url;

interface responseToken {
  token: string;
  menu: [];
}

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: { signOut() };
  public usuario: Usuario;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get rol(): 'ADMIN_ROL' | 'USER_ROL'{
    return this.usuario.rol; 
  }

  get uid(): string {
    return this.usuario._id || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

 guardarLocalStorage(token: string, menu: any) {
   localStorage.setItem('token', token);
   localStorage.setItem('menu', JSON.stringify(menu));
 }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/auth/renew`, this.headers).pipe(
      map((resp: any) => {
        const { email, google, nombre, rol, img = '', _id } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', rol, google, img, _id);
	
	this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((res: any) => {
      	this.guardarLocalStorage(res.token, res.menu);
      })
    );
  }

  actualizarPerfil(data: { email: string; nombre: string; rol: string }) {
    data = {
      ...data,
      rol: this.usuario.rol
    };

    return this.http.put(
      `${base_url}/usuarios/${this.uid}`,
      data,
      this.headers
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/auth`, formData).pipe(
      tap((res: any) => {
      	this.guardarLocalStorage(res.token, res.menu);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/auth/google`, { token }).pipe(
      tap((res: any) => {
      	this.guardarLocalStorage(res.token, res.menu);
      })
    );
  }

  googleInit() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '254893407351-ouvunt9bvdrv51s2b32ompeb9mpbcd00.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });
        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  cargarUsuarios(by: number = 0) {
    const url = `${base_url}/usuarios?by=${by}`; //TODO: agregar a todos los metodos
    return this.http.get<CargarUsuarios>(url, this.headers).pipe(
      //el delay de operator simula una conexion lenta
      map(resp => {
        const usuarios = resp.usuarios.map(
          user =>
            new Usuario(
              user.nombre,
              user.email,
              '',
              user.rol,
              user.google,
              user.img,
              user._id
            )
        );
        return {
          total: resp.total,
          usuarios
        };
      })
    );
  }

  deleteUser(user: Usuario) {
    const url = `${base_url}/usuarios/${user._id}`;
    return this.http.delete(url, this.headers);
  }

  guardarPerfil(data: Usuario) {
    return this.http.put(
      `${base_url}/usuarios/${data._id}`,
      data,
      this.headers
    );
  }
}
