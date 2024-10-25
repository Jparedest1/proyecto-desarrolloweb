import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteCrearComponent } from './cliente-crear/cliente-crear.component';
import { ClienteConsultarComponent } from './cliente-consultar/cliente-consultar.component';
import { ClienteActualizarComponent } from './cliente-actualizar/cliente-actualizar.component';
import { ClienteEliminarComponent } from './cliente-eliminar/cliente-eliminar.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClienteRoutingModule,
    ClienteCrearComponent,
    ClienteConsultarComponent,
    ClienteActualizarComponent,
    ClienteEliminarComponent
  ],
})
export class ClienteModule { }