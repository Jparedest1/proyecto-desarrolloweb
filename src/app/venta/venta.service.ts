import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'https://ventasdb.onrender.com/api/Ventas'; // Ruta base de la API para ventas

  constructor() { }

  // Obtener todas las ventas
  getVentas(): Promise<any> {
    return fetch(this.apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  }

  // Obtener una venta específica por ID
  getVenta(id: number): Promise<any> {
    return fetch(`${this.apiUrl}/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  }

  // Crear una nueva venta
  createVenta(ventaData: any): Promise<any> {
    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ventaData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  }

  // Actualizar una venta existente
  updateVenta(id: number, ventaData: any): Promise<any> {
    return fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ventaData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  }

  // Eliminar una venta
  deleteVenta(id: number): Promise<any> {
    return fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  }
  getUltimoIdVenta(): Promise<number> {
    return fetch(this.apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }) 
      .then(ventas => {
        if (ventas.length === 0) {
          return 1; // Si no hay ventas, comenzar con ID 1
        }
        const ultimoId = Math.max(...ventas.map((venta: any) => venta.idVenta)); // Obtener el ID más alto
        return ultimoId + 1; // Incrementar para la nueva venta
      });
  }
}
