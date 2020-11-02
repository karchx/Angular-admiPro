import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'account-setting',
        component: AccountSettingsComponent,
        data: { title: 'Setting' }
      },
      {
        path: 'busqueda/:termino',
        component: BusquedasComponent,
        data: { title: 'Search' }
      },
      {
        path: 'chart1',
        component: Grafica1Component,
        data: { title: 'Chart #1' }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'Progress' }
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { title: 'Promises' }
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { title: 'Perfil de usuario' }
      },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },

      //Mantenimientos
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { title: 'Mantenimiento de hospitales' }
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { title: 'Mantenimiento de medicos' }
      },
      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: { title: 'Mantenimiento de medicos' }
      },
      //Administrado
      {
        path: 'usuarios',
	canActivate: [AdminGuard],
        component: UsuariosComponent,
        data: { title: 'Mantenimiento de usuarios' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
