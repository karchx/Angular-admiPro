import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../service/sidebar.service';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuarios.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  public menu: any[]
  public usuario:Usuario;

  constructor(private sidebarService:SidebarService, 
              private usuarioService:UsuarioService) {
    this.menu = sidebarService.menus;
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
  }

}
