import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../proveedor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedor-consultar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedor-consultar.component.html',
  styleUrl: './proveedor-consultar.component.css'
})
export class ProveedorConsultarComponent implements OnInit {
  proveedores: any[] = [];
  filteredProveedores: any[] = [];
  searchId: number | null = null;
  searchName: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.getAllProveedores();
  }

  getAllProveedores(): void {
    this.isLoading = true;
    this.proveedorService.getProveedores()
      .then(proveedores => {
        this.proveedores = proveedores;
        this.filteredProveedores = proveedores;
        this.isLoading = false;
      })
      .catch(error => {
        this.errorMessage = 'Error al obtener proveedores';
        this.isLoading = false;
      });
  }

  searchProveedores(): void {
    if (this.searchId) {
      this.proveedorService.getProveedor(this.searchId)
        .then(proveedor => {
          this.filteredProveedores = [proveedor];
        })
        .catch(error => {
          this.errorMessage = 'Proveedor no encontrado';
        });
    } else if (this.searchName) {
      this.filteredProveedores = this.proveedores.filter(proveedor =>
        proveedor.nombreProveedor.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }
  }

  clearSearch(): void {
    this.searchId = null;
    this.searchName = '';
    this.filteredProveedores = this.proveedores;
  }
}
