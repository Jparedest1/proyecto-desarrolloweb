import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../producto.service';

interface Producto {
  idProducto: number;
  descripcion: string;
  precioUnitario: number;
  idProveedor: number;
  fechaVencimiento: string;
  ubicacionFisica: string;
  existenciaMinima: number;
}

@Component({
  selector: 'app-producto-eliminar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-eliminar.component.html',
  styleUrl: './producto-eliminar.component.css'
})
export class ProductoEliminarComponent implements OnInit {
  productos: Producto[] = [];
  filteredProductos: Producto[] = [];
  selectedProducto: Producto | null = null;
  isLoading = false;
  errorMessage = '';
  deleteMessage = '';
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

  deleteProducto() {
    if (this.selectedProducto) {
      this.isLoading = true;
      this.errorMessage = '';
      this.deleteMessage = '';
      this.productoService.deleteProducto(this.selectedProducto.idProducto)
        .then(() => {
          this.deleteMessage = 'Producto eliminado exitosamente.';
          this.loadProductos();
          this.selectedProducto = null;
          this.isLoading = false;
        })
        .catch((error) => {
          this.errorMessage = 'Error al eliminar el producto. Por favor, intente de nuevo.';
          this.isLoading = false;
        });
    }
  }
}
