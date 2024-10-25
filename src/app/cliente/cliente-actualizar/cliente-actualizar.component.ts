import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../cliente.service';

interface Cliente {
  idCliente: number;
  nombresCliente: string;
  apellidosCliente: string;
  nit: string;
  direccionCliente: string;
  categoriaCliente: string;
  estadoCliente: string;
}

@Component({
  selector: 'app-cliente-actualizar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-actualizar.component.html',
  styleUrl: './cliente-actualizar.component.css'
})
export class ClienteActualizarComponent implements OnInit {
  clients: Cliente[] = [];
  filteredClients: Cliente[] = [];
  selectedClient: Cliente | null = null;
  isLoading = false;
  errorMessage = '';
  updateMessage = '';
  searchId: number | null = null;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.isLoading = true;
    this.errorMessage = '';
    this.clientService.getClients()
      .then((clients) => {
        this.clients = clients;
        this.filteredClients = clients;
        this.isLoading = false;
      })
      .catch((error) => {
        this.errorMessage = 'Error al cargar los clientes. Por favor, intente de nuevo.';
        this.isLoading = false;
      });
  }

  searchClients() {
    if (this.searchId) {
      this.filteredClients = this.clients.filter(client => client.idCliente === this.searchId);
    } else {
      this.filteredClients = this.clients;
    }
  }

  selectClient(client: Cliente) {
    this.selectedClient = { ...client };
  }

  updateClient() {
    if (this.selectedClient) {
      this.isLoading = true;
      this.errorMessage = '';
      this.updateMessage = '';
      this.clientService.updateClient(this.selectedClient.idCliente, this.selectedClient)
        .then(() => {
          this.updateMessage = 'Cliente actualizado exitosamente.';
          this.loadClients();
          this.selectedClient = null;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log('este es el error:', error);
          this.errorMessage = 'Error al actualizar el cliente. Por favor, intente de nuevo.';
          this.isLoading = false;
        });
    }
  }
  
}