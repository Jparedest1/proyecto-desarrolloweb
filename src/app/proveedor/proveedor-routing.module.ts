import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorCrearComponent } from './proveedor-crear/proveedor-crear.component';
import { ProveedorConsultarComponent } from './proveedor-consultar/proveedor-consultar.component';
import { ProveedorActualizarComponent } from './proveedor-actualizar/proveedor-actualizar.component';
import { ProveedorEliminarComponent } from './proveedor-eliminar/proveedor-eliminar.component';



const routes: Routes = [
  { path: 'crear', component: ProveedorCrearComponent },
  { path: 'consultar', component: ProveedorConsultarComponent },
  { path: 'actualizar', component: ProveedorActualizarComponent},
  { path: 'eliminar', component: ProveedorEliminarComponent }
  // Otras rutas para Proveedor aquí, como consultar, actualizar, eliminar...
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }
