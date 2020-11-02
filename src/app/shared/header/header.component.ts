import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../../models/usuarios.model';

import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  public usuario:Usuario;

  constructor(private usuarioService:UsuarioService,
              private router: Router) { 
    this.usuario = usuarioService.usuario;
  }
º
  logout(){
    this.usuarioService.logout();
  }

  search (termino: string) {
    if( termino.length === 0 ){
      return this.router.navigateByUrl('/dashboard');
    }
    this.router.navigateByUrl(`/dashboard/busqueda/${termino}`);
  }

}
