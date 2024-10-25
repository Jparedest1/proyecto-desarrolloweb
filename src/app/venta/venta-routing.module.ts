import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaxMayorComponent } from './ventaxmayor/ventaxmayor-crear/ventaxmayor.component';
import { VentaxMenorComponent } from './ventaxmenor/ventaxmenor-crear/ventaxmenor.component';

const routes: Routes = [
  { path: 'ventaxmayor', component: VentaxMayorComponent },
  { path: 'ventaxmenor', component: VentaxMenorComponent },
  // Agrega otras rutas de venta según sea necesario, por ejemplo:
  // { path: 'ventaxmenor', component: VentaxMenorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }
