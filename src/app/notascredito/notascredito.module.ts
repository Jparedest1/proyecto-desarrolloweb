import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotasCreditoRoutingModule } from './notascredito-routing.module';
import { VentasEliminarComponent } from './notascredito-eliminar/notascredito-eliminar.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NotasCreditoRoutingModule,
    VentasEliminarComponent
  ],
})
export class NotasCreditoModule { }
