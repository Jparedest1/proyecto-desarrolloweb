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
  selector: 'app-proveedor-actualizar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedor-actualizar.component.html',
  styleUrl: './proveedor-actualizar.component.css'
})
export class ProveedorActualizarComponent implements OnInit {
  proveedores: Proveedor[] = [];
  filteredProveedores: Proveedor[] = [];
  selectedProveedor: Proveedor | null = null;
  isLoading = false;
  errorMessage = '';
  updateMessage = '';
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

  updateProveedor() {
    if (this.selectedProveedor) {
      this.isLoading = true;
      this.errorMessage = '';
      this.updateMessage = '';
      this.proveedorService.updateProveedor(this.selectedProveedor.idProveedor, this.selectedProveedor)
        .then(() => {
          this.updateMessage = 'Proveedor actualizado exitosamente.';
          this.loadProveedores();
          this.selectedProveedor = null;
          this.isLoading = false;
        })
        .catch((error) => {
          this.errorMessage = 'Error al actualizar el proveedor. Por favor, intente de nuevo.';
          this.isLoading = false;
        });
    }
  }
}
