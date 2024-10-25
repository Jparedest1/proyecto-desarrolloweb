import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../producto.service';
import { ProveedorService } from '../../proveedor/proveedor.service';
import { Router } from '@angular/router';

interface Producto {
  idProducto: number;
  descripcion: string;
  precioUnitario: number; // Campo agregado
  idProveedor: number;
  fechaVencimiento: string;
  ubicacionFisica: string;
  existenciaMinima: number;
}

interface Proveedor {
  idProveedor: number;
  nombreProveedor: string;
  direccionProveedor: string;
  contactoProveedor: string;
}

@Component({
  selector: 'app-producto-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-crear.component.html',
  styleUrl: './producto-crear.component.css'
})
export class ProductoCrearComponent implements OnInit {
  productoForm: FormGroup;
  proveedores: Proveedor[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
      idProducto: ['', Validators.required],
      descripcion: ['', Validators.required],
      precioUnitario: ['', [Validators.required, Validators.min(0)]], // Validación para el nuevo campo
      idProveedor: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      ubicacionFisica: ['', Validators.required],
      existenciaMinima: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadProveedores();
  }

  loadProveedores() {
    this.isLoading = true;
    this.proveedorService.getProveedores()
      .then(proveedores => {
        this.proveedores = proveedores;
        this.isLoading = false;
      })
      .catch(error => {
        this.errorMessage = 'Error al cargar los proveedores. Por favor, intente de nuevo.';
        this.isLoading = false;
      });
  }

  onSubmit() {
    if (this.productoForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      
      const newProducto: Producto = this.productoForm.value;
      
      this.productoService.createProducto(newProducto)
        .then(() => {
          console.log('esto se envia', newProducto);
          this.successMessage = 'Producto creado exitosamente.';
          this.productoForm.reset();
          this.isLoading = false;
        })
        .catch(error => {
          this.errorMessage = 'Error al crear el producto. Por favor, intente de nuevo.';
          this.isLoading = false;
        });
    }
  }

  irAPagina(event: Event, url: string) {
    event.preventDefault(); // Evita que el enlace redirija directamente
    this.router.navigateByUrl(url); // Navega a la ruta proporcionada
  }
}

