import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menus:any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Main', url: '/'},
        {title: 'Pogress bar', url: 'progress'},
        {title: 'Charts', url: 'chart1'},
        {title: 'Promesas', url: 'promesas'},
        {title: 'RxJs', url: 'rxjs'}
      ]
    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {title: 'Usuario', url: 'usuarios'},
        {title: 'Hospitales', url: 'hospitales'},
        {title: 'Medicos', url: 'medicos'},
      ]
    },

  ]

  constructor() { }
}
