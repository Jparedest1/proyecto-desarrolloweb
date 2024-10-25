import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteCrearComponent } from './cliente-crear/cliente-crear.component';
import { ClienteConsultarComponent } from './cliente-consultar/cliente-consultar.component';
import { ClienteActualizarComponent } from './cliente-actualizar/cliente-actualizar.component';
import { ClienteEliminarComponent } from './cliente-eliminar/cliente-eliminar.component';

const routes: Routes = [
  { path: 'crear', component: ClienteCrearComponent },
  { path: 'consultar', component: ClienteConsultarComponent },
  { path: 'actualizar', component: ClienteActualizarComponent},
  { path: 'eliminar', component: ClienteEliminarComponent }
  // Otras rutas para Cliente aquí, como consultar, actualizar, eliminar...
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
