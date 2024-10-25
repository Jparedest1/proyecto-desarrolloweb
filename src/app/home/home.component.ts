import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // agregar aquí otros módulos si es necesario
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent { 
    names = ['Jhony Alexander Paredes Tajín', 'Gerson Geovany Sulá Sulá','Geancarlo Velasquez', 'José Enrique de León Argueta','Lesly Maribel Garcia Gonzalez', 'Oscar Javier García López']
    carnets = ['0910-13-18822', '0910-20-23141', '5190-15-1559', '0902-21-11656', '9941-16-15599', '3190-10-6217']
    sidebarActive = false;
    submenuStates: { [key: string]: boolean } = {
    cliente: false,
    proveedor: false,
    producto: false,
    venta: false,
    notasCredito: false,
    entrega: false
  };
  
  constructor(private router: Router) {} 
  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  toggleSubmenu(event: Event, submenu: string) {
    event.preventDefault();
    this.submenuStates[submenu] = !this.submenuStates[submenu];
  }

  // Método para navegar a una página
  irAPagina(event: Event, url: string) {
    event.preventDefault(); // Evita que el enlace redirija directamente
    this.router.navigateByUrl(url); // Navega a la ruta proporcionada
  }
}

