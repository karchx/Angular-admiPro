import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuarios.model';

import { UsuarioService } from '../../../service/usuario.service';
import { SearchesService } from '../../../service/searches.service';
import { ModalImagenService } from '../../../service/modal-imagen.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})

export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private searchService: SearchesService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.newImg
      .pipe(delay(100))
      .subscribe(() => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  search(termino: string) {
    if (termino.length === 0) {
      return (this.usuarios = this.usuariosTemp);
    }

    this.searchService.search('usuarios', termino).subscribe(resp => {
      this.usuarios = resp;
    });
  }

  deleteUser(user: Usuario) {
    if (user._id === this.usuarioService.uid) {
      return Swal.fire('Error', `Can't erase yourself`, 'error');
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `He's about to erase  ${user.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUser(user).subscribe(() => {
          this.cargarUsuarios();
          Swal.fire(
            'Deleted user',
            `${user.nombre} successfully eliminated`,
            'success'
          );
        });
      }
    });
  }

  cambiarRol(usuario: Usuario) {
    this.usuarioService
      .guardarPerfil(usuario)
      .subscribe(res => console.log(res));
  }

  abrirModal(user: Usuario) {
    this.modalImagenService.abrirModal('usuarios', user._id, user.img);
  }
}
