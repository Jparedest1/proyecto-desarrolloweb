import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasEliminarComponent } from './notascredito-eliminar/notascredito-eliminar.component';

const routes: Routes = [
  { path: 'eliminar', component: VentasEliminarComponent }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotasCreditoRoutingModule { }
