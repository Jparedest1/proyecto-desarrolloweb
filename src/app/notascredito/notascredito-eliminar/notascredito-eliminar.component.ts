import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../notascredito.service';

interface Ventas {
  idVenta: number;
  idCliente: number;
  idProducto: string;
  fechaVenta: number;
  tipoVenta: number;
  formaPago: string;
  totalVenta: number;
}

@Component({
  selector: 'app-notascredito-eliminar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notascredito-eliminar.component.html',
  styleUrl: './notascredito-eliminar.component.css'
})
export class VentasEliminarComponent implements OnInit {
  ventas: Ventas[] = [];
  filteredVentas: Ventas[] = [];
  selectedVentas: Ventas | null = null;
  isLoading = false;
  errorMessage = '';
  deleteMessage = '';
  searchId: number | null = null;

  constructor(private ventaService: VentaService) {}

  ngOnInit() {
    this.loadVentas();
  }

  loadVentas() {
    this.isLoading = true;
    this.errorMessage = '';
    this.ventaService.getVentas()
      .then((ventas) => {
        this.ventas = ventas;
        this.filteredVentas = ventas;
        this.isLoading = false;
      })
      .catch(() => {
        this.errorMessage = 'Error al cargar las ventas. Por favor, intente de nuevo.';
        this.isLoading = false;
      });
  }

  searchVentas() {
    if (this.searchId) {
      this.filteredVentas = this.ventas.filter(ventas => ventas.idVenta === this.searchId);
    } else {
      this.filteredVentas = this.ventas;
    }
  }

  selectVenta(ventas: Ventas) {
    this.selectedVentas = { ...ventas };
  }

  deleteVenta() {
    if (this.selectedVentas) {
      this.isLoading = true;
      this.errorMessage = '';
      this.deleteMessage = '';
      this.ventaService.deleteVenta(this.selectedVentas.idVenta)
        .then(() => {
          this.deleteMessage = 'Producto eliminado exitosamente.';
          this.loadVentas();
          this.selectedVentas = null;
          this.isLoading = false;
        })
        .catch((error) => {
          this.errorMessage = 'Error al eliminar el producto. Por favor, intente de nuevo.';
          this.isLoading = false;
        });
    }
  }
}
