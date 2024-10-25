import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoCrearComponent } from './producto-crear/producto-crear.component';
import { ProductoConsultarComponent } from './producto-consultar/producto-consultar.component';
import { ProductoActualizarComponent } from './producto-actualizar/producto-actualizar.component';
import { ProductoEliminarComponent } from './producto-eliminar/producto-eliminar.component';

const routes: Routes = [
  { path: 'crear', component: ProductoCrearComponent },
  { path: 'consultar', component: ProductoConsultarComponent },
  { path: 'actualizar', component: ProductoActualizarComponent},
  { path: 'eliminar', component: ProductoEliminarComponent }
  // Otras rutas para Proveedor aquí, como consultar, actualizar, eliminar...
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
