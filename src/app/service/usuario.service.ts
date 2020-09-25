import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface'
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';

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
  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone

  ) {
    this.googleInit();
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/auth/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(tap((resp: any) => {
      localStorage.setItem('token', resp.token)
    }),
      map(resp => true),
      catchError(error => of(false)));
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(tap((res: responseToken) => {
        localStorage.setItem('token', res.token)
      }));
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
