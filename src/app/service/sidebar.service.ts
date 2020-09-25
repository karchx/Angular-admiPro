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
   
  ]

  constructor() { }
}
