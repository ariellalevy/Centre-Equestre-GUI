import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelModifyPasswordComponent } from './panel-modify-password/panel-modify-password.component'
import { PanelPrincipalComponent } from './panel-principal/panel-principal.component'

const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'principal', component: PanelPrincipalComponent },
  { path: 'password', component: PanelModifyPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
