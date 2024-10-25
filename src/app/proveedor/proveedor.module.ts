import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ProveedorCrearComponent } from './proveedor-crear/proveedor-crear.component';
import { ProveedorConsultarComponent } from './proveedor-consultar/proveedor-consultar.component';
import { ProveedorActualizarComponent } from './proveedor-actualizar/proveedor-actualizar.component';
import { ProveedorEliminarComponent } from './proveedor-eliminar/proveedor-eliminar.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProveedorRoutingModule,
    ProveedorCrearComponent,
    ProveedorConsultarComponent,
    ProveedorActualizarComponent,
    ProveedorEliminarComponent
  ],
})
export class ProveedorModule { }
