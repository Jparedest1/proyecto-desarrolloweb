import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from '../proveedor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedor-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proveedor-crear.component.html',
  styleUrl: './proveedor-crear.component.css'
})
export class ProveedorCrearComponent  {
  proveedorForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder, 
    private proveedorService: ProveedorService,
    private router: Router
  ) {
    this.proveedorForm = this.fb.group({
      idProveedor: [0, Validators.required],
      nombreProveedor: ['', Validators.required],
      direccionProveedor: ['', Validators.required],
      contactoProveedor: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.proveedorForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.proveedorService.createProveedor(this.proveedorForm.value)
        .then(data => {
          console.log('Proveedor creado con éxito:', data);
          this.successMessage = 'Proveedor creado con éxito!';
          this.proveedorForm.reset({
            idProveedor: 0,
            nombreProveedor: '',
            direccionProveedor: '',
            contactoProveedor: ''
          });
        })
        .catch(error => {
          console.error('Error al crear el proveedor:', error);
          this.errorMessage = 'Se produjo un error al crear el proveedor. Inténtalo nuevamente.';
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }

  irAPagina(event: Event, url: string) {
    event.preventDefault(); // Evita que el enlace redirija directamente
    this.router.navigateByUrl(url); // Navega a la ruta proporcionada
  }

}

