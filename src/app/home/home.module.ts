import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module'; // Importa el módulo de enrutamiento

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule // Importa el módulo de enrutamiento
  ],
})
export class HomeModule { }

