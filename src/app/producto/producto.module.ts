import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoCrearComponent } from './producto-crear/producto-crear.component';
import { ProductoConsultarComponent } from './producto-consultar/producto-consultar.component';
import { ProductoActualizarComponent } from './producto-actualizar/producto-actualizar.component';
import { ProductoEliminarComponent } from './producto-eliminar/producto-eliminar.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductoRoutingModule,
    ProductoCrearComponent,
    ProductoConsultarComponent,
    ProductoActualizarComponent,
    ProductoEliminarComponent
  ]
})
export class ProductoModule { }
