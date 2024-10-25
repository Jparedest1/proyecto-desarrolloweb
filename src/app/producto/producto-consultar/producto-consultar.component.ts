import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto-consultar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-consultar.component.html',
  styleUrl: './producto-consultar.component.css'
})
export class ProductoConsultarComponent implements OnInit {
  productos: any[] = [];
  filteredProductos: any[] = [];
  searchId: number | null = null;
  searchDescription: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.getAllProductos();
  }

  getAllProductos(): void {
    this.isLoading = true;
    this.productoService.getProductos()
      .then(productos => {
        console.log('esto se recibe', productos);
        this.productos = productos;
        this.filteredProductos = productos;
        this.isLoading = false;
      })
      .catch(error => {
        this.errorMessage = 'Error al obtener productos';
        this.isLoading = false;
      });
  }

  searchProveedores(): void {
    if (this.searchId) {
      this.productoService.getProducto(this.searchId)
        .then(producto => {
          this.filteredProductos = [producto];
        })
        .catch(error => {
          this.errorMessage = 'Producto no encontrado';
        });
    } else if (this.searchDescription) {
      this.filteredProductos = this.productos.filter(producto =>
        producto.descripcion.toLowerCase().includes(this.searchDescription.toLowerCase())
      );
    }
  }

  clearSearch(): void {
    this.searchId = null;
    this.searchDescription = '';
    this.filteredProductos = this.productos;
  }
}
