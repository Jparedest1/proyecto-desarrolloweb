import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProveedorService } from '../proveedor.service';

interface Proveedor {
  idProveedor: number;
  nombreProveedor: string;
  direccionProveedor: string;
  contactoProveedor: string;
}
@Component({
  selector: 'app-proveedor-eliminar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedor-eliminar.component.html',
  styleUrl: './proveedor-eliminar.component.css'
})
export class ProveedorEliminarComponent implements OnInit {
  proveedores: Proveedor[] = [];
  filteredProveedores: Proveedor[] = [];
  selectedProveedor: Proveedor | null = null;
  isLoading = false;
  errorMessage = '';
  deleteMessage = '';
  searchId: number | null = null;

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit() {
    this.loadProveedores();
  }

  loadProveedores() {
    this.isLoading = true;
    this.errorMessage = '';
    this.proveedorService.getProveedores()
      .then((proveedores) => {
        this.proveedores = proveedores;
        this.filteredProveedores = proveedores;
        this.isLoading = false;
      })
      .catch((error) => {
        this.errorMessage = 'Error al cargar los proveedores. Por favor, intente de nuevo.';
        this.isLoading = false;
      });
  }

  searchProveedores() {
    if (this.searchId) {
      this.filteredProveedores = this.proveedores.filter(proveedor => proveedor.idProveedor === this.searchId);
    } else {
      this.filteredProveedores = this.proveedores;
    }
  }

  selectProveedor(proveedor: Proveedor) {
    this.selectedProveedor = { ...proveedor };
  }

  deleteProveedor() {
    if (this.selectedProveedor) {
      this.isLoading = true;
      this.errorMessage = '';
      this.deleteMessage = '';
      this.proveedorService.deleteProveedor(this.selectedProveedor.idProveedor)
        .then(() => {
          this.deleteMessage = 'Proveedor eliminado exitosamente.';
          this.loadProveedores();
          this.selectedProveedor = null;
        })
        .catch((error) => {
          this.errorMessage = 'Error al eliminar el proveedor. Por favor, intente de nuevo.';
          this.isLoading = false;
        });
    }
  }
}

