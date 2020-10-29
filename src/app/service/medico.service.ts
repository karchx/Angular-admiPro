import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Medico } from '../models/medicos.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  cargarMedicos() {
    const url = `${base_url}/medico`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((res: { ok: boolean; medicos: Medico[] }) => res.medicos)
      );
  }

  obtenerMedicoPorId(id: string) {
    const url = `${base_url}/medico/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((res: { ok: boolean; medico: Medico }) => res.medico)
      );
  }

  crearMedicos(medico: { nombre: string, hospital: string }) {
    const url = `${base_url}/medico`;
    return this.http.post<{ ok: boolean, medico: Medico }>(url, medico, this.headers)
      .pipe(
        map(res => res.medico)
      )
  }

  actualizarMedico(medico: Medico) {
    const url = `${base_url}/medico/${medico._id}`;
    return this.http.put(url, medico, this.headers);
  }

  eliminarMedico(medico: Medico) {
    const url = `${base_url}/medico/${medico._id}`;
    return this.http.delete(url, this.headers);
  }

}
