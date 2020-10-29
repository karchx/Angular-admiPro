import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { HospitalService } from '../../../service/hospital.service';
import { ModalImagenService } from '../../../service/modal-imagen.service';
import { SearchesService } from '../../../service/searches.service';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(private hospitalesService: HospitalService,
    private searchService: SearchesService,
    private modalImagenService: ModalImagenService) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.newImg
      .pipe(delay(100))
      .subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;

    this.hospitalesService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
      });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalesService.actualizarHospitales(hospital._id, hospital.nombre)
      .subscribe(res => {
        Swal.fire('Updated', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalesService.eliminarHospitales(hospital._id)
      .subscribe(res => {
        this.cargarHospitales();
        Swal.fire('Erased', hospital.nombre, 'success');
      });
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create new hospital',
      text: 'Enter the name of the new hospital',
      input: 'text',
      inputPlaceholder: 'Enter the name',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalesService.crearHospitales(value)
        .subscribe((res: { ok: boolean, hospital: Hospital }) => {
          this.hospitales.push(res.hospital);
        });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal("hospitales", hospital._id, hospital.img);
  }

  search(termino: string) {
    if (termino.length === 0) {
      return this.cargarHospitales();
    }

    this.searchService.search('hospitales', termino)
      .subscribe(resp => {
        this.hospitales = resp;
      });
  }
}
