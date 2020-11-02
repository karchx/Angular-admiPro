import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medicos.model';
import { Usuario } from'../../models/usuarios.model';
import { SearchesService } from '../../service/searches.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];


  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private searchService: SearchesService) { }

  ngOnInit(): void {
    this.activateRoute.params
      .subscribe( ({ termino }) => this.searchGlobal(termino));
  }

  searchGlobal( termino: string ) {
    this.searchService.searchGlobal( termino )
      .subscribe( (res:any) => {
        this.usuarios = res.usuarios;
        this.medicos = res.medico;
        this.hospitales = res.hospital;
      });
  }

  abrirMedico(medico: Medico) {
    this.router.navigateByUrl(`/dashboard/medico/${medico._id}`);
  }

}
