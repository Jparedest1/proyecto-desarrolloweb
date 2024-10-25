import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {
  private apiUrl = 'https://ventasdb.onrender.com/api/DetalleVentas'; // Ruta base de la API para detalle de ventas

  constructor() { }

  // Obtener el último ID de detalle de venta
  getUltimoIdDetalleVenta(): Promise<number> {
    return fetch(this.apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(detalles => {
        if (detalles.length === 0) {
          return 1; // Si no hay detalles de ventas, comenzar con ID 1
        }
        const ultimoId = Math.max(...detalles.map((detalle: any) => detalle.idDetalleVenta)); // Obtener el ID más alto
        return ultimoId + 1; // Incrementar para el nuevo detalle de venta
      });
  }

  // Crear un nuevo detalle de venta
  createDetalleVenta(detalleVentaData: any): Promise<any> {
    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(detalleVentaData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  }
}
