import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VentaRoutingModule } from './venta-routing.module';
import { VentaxMayorComponent } from './ventaxmayor/ventaxmayor-crear/ventaxmayor.component';
import { VentaxMenorComponent } from './ventaxmenor/ventaxmenor-crear/ventaxmenor.component';

@NgModule({
  declarations: [VentaxMayorComponent, VentaxMenorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VentaRoutingModule
  ]
})
export class VentaModule { }
