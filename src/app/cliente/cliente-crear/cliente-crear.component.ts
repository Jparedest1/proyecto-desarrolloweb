import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../cliente.service';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-cliente-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-crear.component.html',
  styleUrl: './cliente-crear.component.css'
})
export class ClienteCrearComponent {
  clientForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.clientForm = this.fb.group({
      idCliente: [0, Validators.required],
      nombresCliente: ['', Validators.required],
      apellidosCliente: ['', Validators.required],
      nit: ['', Validators.required],
      direccionCliente: ['', Validators.required],
      categoriaCliente: ['', Validators.required],
      estadoCliente: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.clientService.createClient(this.clientForm.value)
        .then(data => {
          console.log('Cliente creado con éxito:', data);
          this.successMessage = 'Cliente creado con éxito!';
          this.clientForm.reset({
            idCliente: 0,
            nombresCliente: '',
            apellidosCliente: '',
            nit: '',
            direccionCliente: '',
            categoriaCliente: '',
            estadoCliente: ''
          });
        })
        .catch(error => {
          console.error('Error al crear el cliente:', error);
          this.errorMessage = 'Se produjo un error al crear el cliente. Inténtalo nuevamente.';
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }

}
