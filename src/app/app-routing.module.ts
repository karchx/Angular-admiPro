import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

//modulos
import { PagesRoutingModule } from './pages/pages.routing.module';
import { AuthRoutingModule } from './auth/auth.routing.module';

import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [

  /*
  * PagesRouting
  * path: '/dashboard'
  * path: '/progress'
  * path: 'grafica1'
  * 
  * AuthRouting
  * path: '/login'
  * path: '/register'
  */

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
