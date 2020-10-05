import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface'
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuarios.model';

const base_url = environment.base_url;

interface responseToken {
  token: string;
}

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;
  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone

  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.id || '';
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/auth/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { email, google, nombre, rol, img = '', _id } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', rol, google, img, _id);

        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false)));
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(tap((res: responseToken) => {
        localStorage.setItem('token', res.token)
      }));
  }

  actualizarPerfil(data: { email: string, nombre: string, rol:string }) {
    data = {
      ...data, 
      rol: this.usuario.role
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/auth`, formData)
      .pipe(tap((res: responseToken) => {
        localStorage.setItem('token', res.token)
      })
      )
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/auth/google`, { token })
      .pipe(tap((res: responseToken) => {
        localStorage.setItem('token', res.token)
      })
      )
  }

  googleInit() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '254893407351-ouvunt9bvdrv51s2b32ompeb9mpbcd00.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });
        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

}
