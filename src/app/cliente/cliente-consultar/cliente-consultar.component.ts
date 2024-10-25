import { Component, OnInit } from '@angular/core';
import { ClientService } from '../cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-cliente-consultar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-consultar.component.html',
  styleUrl: './cliente-consultar.component.css'
})
export class ClienteConsultarComponent implements OnInit {
  clients: any[] = [];
  filteredClients: any[] = [];
  searchId: number | null = null;
  searchName: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients(): void {
    this.isLoading = true;
    this.clientService.getClients()
      .then(clients => {
        this.clients = clients;
        this.filteredClients = clients;
        this.isLoading = false;
      })
      .catch(error => {
        this.errorMessage = 'Error al obtener clientes';
        this.isLoading = false;
      });
  }

  searchClients(): void {
    if (this.searchId) {
      this.clientService.getClient(this.searchId)
        .then(client => {
          this.filteredClients = [client];
        })
        .catch(error => {
          this.errorMessage = 'Cliente no encontrado';
        });
    } else if (this.searchName) {
      this.filteredClients = this.clients.filter(client =>
        client.nombresCliente.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }
  }

  clearSearch(): void {
    this.searchId = null;
    this.searchName = '';
    this.filteredClients = this.clients;
  }
}