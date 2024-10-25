import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../cliente/cliente.service';
import { ProductoService } from '../../../producto/producto.service';
import { VentaService } from '../../../venta/venta.service'; // Importar el servicio de Ventas
import { DetalleVentaService } from '../../../venta/detalle-venta.service';
@Component({
  selector: 'app-ventaxmayor',
  templateUrl: './ventaxmayor.component.html',
  styleUrls: ['./ventaxmayor.component.css']
})
export class VentaxMayorComponent implements OnInit {
  ventaForm: FormGroup;
  clientes: any[] = [];
  productos: any[] = [];
  productosAgregados: any[] = []; // Lista de productos agregados
  clienteSeleccionado: any = null;
  productoSeleccionado: any = null;
  totalVenta: number = 0; // Total de la venta
  descuento: number = 0; // Descuento aplicado
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  clienteFijado: boolean = false; // Verificar si el cliente ya está fijado
  nuevoIdVenta: number = 0;
  ultimoIdDetalleVenta: number = 0;
  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private productoService: ProductoService,
    private ventaService: VentaService,
    private detalleVentaService: DetalleVentaService
  ) {
    this.ventaForm = this.fb.group({
      idCliente: ['', Validators.required],
      idProducto: ['', Validators.required],
      fechaVenta: [{ value: '', disabled: true }],
      tipoVenta: ['', Validators.required],  // Agregar tipo de venta
      formaPago: ['', Validators.required],  // Agregar forma de pago
      cantidad: ['', Validators.required],
      precioUnitario: [{ value: '', disabled: true }],
      subtotal: [{ value: '', disabled: true }]

    });
  }

  ngOnInit(): void {
    this.getAllClients();
    this.getAllProductos();
    this.setFechaActual();
    this.obtenerUltimoIdVenta();
    this.obtenerUltimoIdDetalleVenta();
  }
  obtenerUltimoIdVenta(): void {
    this.ventaService.getUltimoIdVenta().then((nuevoId: number) => {
      this.nuevoIdVenta = nuevoId;  // Asignar el nuevo ID
    }).catch(() => {
      this.errorMessage = 'Error al obtener el último ID de venta';
    });
  }
  obtenerUltimoIdDetalleVenta(): void {
    this.detalleVentaService.getUltimoIdDetalleVenta()
      .then((ultimoId: number) => { // Declarar el tipo de la variable como number
        this.ultimoIdDetalleVenta = ultimoId; // Asignar el último ID obtenido
      })
      .catch(() => {
        this.errorMessage = 'Error al obtener el último ID de detalle de venta';
      });
  }
  
  getAllClients(): void {
    this.clientService.getClients().then((clientes: any[]) => {
      this.clientes = clientes;
    }).catch(() => {
      this.errorMessage = 'Error al obtener clientes';
    });
  }

  getAllProductos(): void {
    this.productoService.getProductos().then((productos: any[]) => {
      this.productos = productos;
    }).catch(() => {
      this.errorMessage = 'Error al obtener productos';
    });
  }

  setFechaActual(): void {
    const fechaActual = new Date().toISOString().substring(0, 10);
    this.ventaForm.patchValue({ fechaVenta: fechaActual });
  }

  onClienteChange(event: any): void {
    const clienteId = event.target.value;
    this.clienteSeleccionado = this.clientes.find(cliente => cliente.idCliente == clienteId);
    this.clienteFijado = true; // Cliente fijado después de la primera selección
  }

  onProductoChange(event: any): void {
    const productoId = event.target.value;
    this.productoSeleccionado = this.productos.find(producto => producto.idProducto == productoId);
    if (this.productoSeleccionado) {
      this.ventaForm.patchValue({ precioUnitario: this.productoSeleccionado.precioUnitario });
      this.calcularSubtotal();
    }
  }

  calcularSubtotal(): void {
    const cantidad = this.ventaForm.get('cantidad')?.value;
    const precioUnitario = this.productoSeleccionado?.precioUnitario || 0;
    if (cantidad && precioUnitario) {
      const subtotal = cantidad * precioUnitario;
      this.ventaForm.patchValue({ subtotal });
    }
  }

  agregarProducto(): void {
    const cantidad = this.ventaForm.get('cantidad')?.value;
    const precioUnitario = this.productoSeleccionado?.precioUnitario || 0;
    let descuento = 0;
    let precioConDescuento = precioUnitario;
    
    // Calcular el descuento basado en la cantidad
    if (cantidad >= 24) {
      descuento = 10;
    } else if (cantidad >= 12) {
      descuento = 8;
    } else if (cantidad >= 6) {
      descuento = 5;
    }
  
    // Aplicar el descuento al precio unitario
    precioConDescuento = precioUnitario - (precioUnitario * descuento / 100);
    const subtotal = precioConDescuento * cantidad;
  
    // Crear objeto de producto con la información necesaria
    const producto = {
      ...this.productoSeleccionado,
      cantidad,
      descuento,
      precioConDescuento,
      subtotal
    };
  
    this.productosAgregados.push(producto);
    this.calcularTotalVenta();
  
    // Resetear el formulario
    this.ventaForm.reset();
    this.setFechaActual(); // Restablece la fecha
    this.productoSeleccionado = null;
    this.successMessage = 'Producto agregado correctamente.';
    this.errorMessage = '';
  }
  
  calcularTotalVenta(): void {
    this.totalVenta = this.productosAgregados.reduce((total, producto) => total + producto.subtotal, 0);
  }
  

  calcularDescuento(): void {
    const totalCantidad = this.productosAgregados.reduce((total, producto) => total + producto.cantidad, 0);

    // Aplicar el descuento basado en la cantidad de productos
    if (totalCantidad > 24) {
      this.descuento = 0.10;
    } else if (totalCantidad > 12) {
      this.descuento = 0.08;
    } else if (totalCantidad > 6) {
      this.descuento = 0.05;
    } else {
      this.descuento = 0;
    }

    // Aplicar el descuento al total de la venta
    this.totalVenta = this.totalVenta * (1 - this.descuento);
  }

  eliminarProducto(index: number): void {
    this.productosAgregados.splice(index, 1);
    this.calcularTotalVenta();
  }
  verJSON(): void {
    // Construir el objeto de venta
    const ventaData = {
      idVenta: this.nuevoIdVenta,  // ID de la nueva venta
      idCliente: this.clienteSeleccionado?.idCliente,
      fechaVenta: this.ventaForm.get('fechaVenta')?.value,
      tipoVenta: this.ventaForm.get('tipoVenta')?.value,  // Tipo de venta
      formaPago: this.ventaForm.get('formaPago')?.value,  // Forma de pago
      totalVenta: this.totalVenta,
      detalleVenta: this.productosAgregados.map(producto => ({
        idProducto: producto.idProducto,
        cantidad: producto.cantidad,
        precioUnitario: producto.precioConDescuento,
        subtotal: producto.subtotal
      }))
    };
  
    // Mostrar el JSON en la consola
    console.log('Datos de la venta:', JSON.stringify(ventaData, null, 2));
  
    // Mostrar el JSON en un alert para visualización rápida
    alert('JSON de la venta:\n' + JSON.stringify(ventaData, null, 2));
  }
  finalizarVenta(): void {
    if (this.productosAgregados.length > 0) {
      const ventaData = {
        idCliente: this.clienteSeleccionado?.idCliente,
        fechaVenta: this.ventaForm.get('fechaVenta')?.value,
        tipoVenta: this.ventaForm.get('tipoVenta')?.value,
        formaPago: this.ventaForm.get('formaPago')?.value,
        totalVenta: this.totalVenta,
      };

      this.ventaService.createVenta(ventaData)
        .then(response => {
          const idVenta = response.idVenta; // Obtener el ID de la venta creada

          // Guardar el detalle de venta para cada producto
          let detalleVentaId = this.ultimoIdDetalleVenta; // Iniciar con el último ID obtenido
          this.productosAgregados.forEach(producto => {
            detalleVentaId++; // Incrementar el ID para cada detalle de venta

            const detalleVentaData = {
              idDetalleVenta: detalleVentaId,
              idVenta: idVenta,
              idProducto: producto.idProducto,
              cantidad: producto.cantidad,
              precioUnitario: producto.precioConDescuento,
              subtotal: producto.subtotal
            };

            // Enviar el detalle de venta a la API
            this.detalleVentaService.createDetalleVenta(detalleVentaData)
              .then(() => {
                console.log('Detalle de venta guardado:', detalleVentaData);
              })
              .catch(error => {
                this.errorMessage = 'Error al guardar el detalle de venta: ' + error.message;
              });
          });

          // Resetear los datos
          this.successMessage = 'Venta creada exitosamente.';
          this.productosAgregados = [];
          this.totalVenta = 0;
          this.descuento = 0;
          this.ultimoIdDetalleVenta = detalleVentaId; // Actualizar el último ID para futuras ventas
        })
        .catch(error => {
          this.errorMessage = 'Error al guardar la venta: ' + error.message;
        });
    } else {
      this.errorMessage = 'No hay productos agregados.';
    }
  }
}