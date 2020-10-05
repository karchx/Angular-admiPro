import { Component } from '@angular/core';
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

  constructor(private usuarioService:UsuarioService) { 
    this.usuario = usuarioService.usuario;
  }

  logout(){
    this.usuarioService.logout();
  }

}
