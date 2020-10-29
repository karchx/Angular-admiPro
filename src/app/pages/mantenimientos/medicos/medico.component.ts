import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medicos.model';
import { Hospital } from '../../../models/hospital.model';

import { HospitalService } from '../../../service/hospital.service';
import { MedicoService } from '../../../service/medico.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado: Medico;
  public hospitalSeleccionado: Hospital;

  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRouter.params
      .subscribe(({ id }) => this._cargarMedico(id));

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
      });
  }

  private _cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.medicoService.obtenerMedicoPorId(id)
      .pipe(
        delay(100)
      )
      .subscribe(medico => {
        if (!medico) {
          return this.router.navigateByUrl(`/dashboard/medicos`);;
        }

        const { nombre, hospital: { _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      });
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      //editar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico(data)
        .subscribe((res) => {
          Swal.fire('Updated', `${nombre} successfully updated`, 'success');
        });
    } else {
      //crear
      this.medicoService.crearMedicos(this.medicoForm.value)
        .subscribe((res) => {
          Swal.fire('Create', `${nombre} successfully created`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${res._id}`);
        });
    }

  }
}
