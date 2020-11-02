import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuarios.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medicos.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformUsers( result: any[] ): Usuario[] {
    return result.map(
      user => new Usuario(user.nombre, user.email, '', user.rol, user.google, user.img, user._id)
    );
  }

  private transformHospitals( result: any[] ): Hospital[] {
    return result;
  }

  private transformMedicos( result: any[] ): Medico[] {
    return result;
  }

  searchGlobal (termino: string) {
    const url = `${base_url}/todo/${termino}`;
    return this.http.get<any[]>(url, this.headers);
  } 

  search(type: 'usuarios' | 'medicos' | 'hospitales',
    termino: string) {
    const url = `${base_url}/todo/collection/${type}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          switch (type) {
            case 'usuarios':
              return this.transformUsers( resp.resultado );
              
            case 'hospitales':
              return this.transformHospitals( resp.resultado );

            case 'medicos':
              return this.transformMedicos( resp.resultado );

            default:
              return [];
          }
        })
      )
  }
}
