import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../producto.service'; 

interface Producto {
  idProducto: number;
  descripcion: string;
  precioUnitario: number;  // Nuevo campo
  idProveedor: number;
  fechaVencimiento: string;
  ubicacionFisica: string;
  existenciaMinima: number;
}

@Component({
  selector: 'app-producto-actualizar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-actualizar.component.html',
  styleUrl: './producto-actualizar.component.css'
})
export class ProductoActualizarComponent implements OnInit {
  productos: Producto[] = [];
  filteredProductos: Producto[] = [];
  selectedProducto: Producto | null = null;
  isLoading = false;
  errorMessage = '';
  updateMessage = '';
  searchId: number | null = null;

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.isLoading = true;
    this.errorMessage = '';
    this.productoService.getProductos()
      .then((productos) => {
        this.productos = productos;
        this.filteredProductos = productos;
        this.isLoading = false;
      })
      .catch((error) => {
        this.errorMessage = 'Error al cargar los productos. Por favor, intente de nuevo.';
        this.isLoading = false;
      });
  }

  searchProductos() {
    if (this.searchId) {
      this.filteredProductos = this.productos.filter(producto => producto.idProducto === this.searchId);
    } else {
      this.filteredProductos = this.productos;
    }
  }

  selectProducto(producto: Producto) {
    this.selectedProducto = { ...producto };
  }

  updateProducto() {
    if (this.selectedProducto) {
      this.isLoading = true;
      this.errorMessage = '';
      this.updateMessage = '';
      this.productoService.updateProducto(this.selectedProducto.idProducto, this.selectedProducto)
        .then(() => {
          this.updateMessage = 'Producto actualizado exitosamente.';
          this.loadProductos();
          this.selectedProducto = null;
          this.isLoading = false;
        })
        .catch((error) => {
          this.errorMessage = 'Error al actualizar el producto. Por favor, intente de nuevo.';
          this.isLoading = false;
        });
    }
  }
}

