import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medicos.model';

import { ModalImagenService } from '../../../service/modal-imagen.service';
import { MedicoService } from '../../../service/medico.service';
import { SearchesService } from 'src/app/service/searches.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs: Subscription;

  constructor(private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private searchService: SearchesService) { }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.newImg
      .pipe(delay(100))
      .subscribe(() => this.cargarMedicos());
  }

  cargarMedicos() {
    this.medicoService.cargarMedicos()
      .subscribe(medico => {
        this.cargando = false;
        this.medicos = medico
      });
  }

  eliminarMedico (medico: Medico) {
    Swal.fire({
      title: 'Are you sure?',
      text: `He's about to erase  ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico)
          .subscribe(() => {
          this.cargarMedicos();
          Swal.fire(
            'Deleted user',
            `${medico.nombre} successfully eliminated`,
            'success'
          );
        });
      }
    });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal("medicos", medico._id, medico.img);
  }


  search(termino: string) {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    this.searchService.search('medicos', termino)
      .subscribe(resp => {
        this.medicos = resp;
      });
  }

}
