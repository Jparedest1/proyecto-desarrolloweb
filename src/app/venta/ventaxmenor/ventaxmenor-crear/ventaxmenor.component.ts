import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../cliente/cliente.service';
import { ProductoService } from '../../../producto/producto.service';
import { VentaService } from '../../venta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventaxmenor',
  templateUrl: './ventaxmenor.component.html',
  styleUrls: ['./ventaxmenor.component.css']
})
export class VentaxMenorComponent implements OnInit {
  ventaForm: FormGroup;
  clientes: any[] = [];
  productos: any[] = [];
  productosAgregados: any[] = [];
  clienteSeleccionado: any = null;
  productoSeleccionado: any = null;
  totalVenta: number = 0;
  successMessage: string = '';
  errorMessage: string = '';
  warningMessage: string = ''; // Nuevo mensaje de advertencia
  isLoading: boolean = false;
  clienteFijado: boolean = false;
  readonly LIMITE_PRODUCTOS: number = 6; // Constante para el límite de productos

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private productoService: ProductoService,
    private ventaService: VentaService,
    private router: Router
  ) {
    this.ventaForm = this.fb.group({
      idCliente: ['', Validators.required],
      idProducto: ['', Validators.required],
      fechaVenta: [{ value: '', disabled: true }],
      tipoVenta: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      precioUnitario: [{ value: '', disabled: true }],
      subtotal: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.getAllClients();
    this.getAllProductos();
    this.setFechaActual();
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
    this.clienteFijado = true;
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
    // Verificar si ya se alcanzó el límite de productos
    if (this.productosAgregados.length >= this.LIMITE_PRODUCTOS) {
      this.warningMessage = 'Para agregar más productos ingrese a Ventas Por Mayor para aplicar descuentos';
      this.errorMessage = '';
      this.successMessage = '';
      return;
    }

    const cantidad = this.ventaForm.get('cantidad')?.value;
    const precioUnitario = this.productoSeleccionado?.precioUnitario || 0;
    const subtotal = precioUnitario * cantidad;
  
    const producto = {
      ...this.productoSeleccionado,
      cantidad,
      precioUnitario,
      subtotal
    };
  
    this.productosAgregados.push(producto);
    this.calcularTotalVenta();
  
    // Resetear el formulario
    this.ventaForm.reset();
    this.setFechaActual();
    this.productoSeleccionado = null;
    this.successMessage = 'Producto agregado correctamente.';
    this.errorMessage = '';
    this.warningMessage = ''; // Limpiar mensaje de advertencia

    // Mostrar advertencia cuando se está cerca del límite
    if (this.productosAgregados.length === this.LIMITE_PRODUCTOS - 1) {
      this.warningMessage = 'Solo puede agregar 1 producto más. Para más productos use Ventas Por Mayor.';
    }
  }
  
  calcularTotalVenta(): void {
    this.totalVenta = this.productosAgregados.reduce(
      (total, producto) => total + producto.subtotal,
      0
    );
  }

  eliminarProducto(index: number): void {
    this.productosAgregados.splice(index, 1);
    this.calcularTotalVenta();
    // Limpiar mensaje de advertencia si estamos por debajo del límite
    if (this.productosAgregados.length < this.LIMITE_PRODUCTOS) {
      this.warningMessage = '';
    }
  }

  finalizarVenta(): void {
    if (this.productosAgregados.length > 0) {
      const ventaData = {
        idCliente: this.clienteSeleccionado?.idCliente,
        fechaVenta: this.ventaForm.get('fechaVenta')?.value,
        tipoVenta: this.ventaForm.get('tipoVenta')?.value,
        totalVenta: this.totalVenta,
        detalleVenta: this.productosAgregados.map(producto => ({
          idProducto: producto.idProducto,
          cantidad: producto.cantidad,
          precioUnitario: producto.precioUnitario,
          subtotal: producto.subtotal
        }))
      };
  
      this.ventaService.createVenta(ventaData)
        .then(response => {
          this.successMessage = 'Venta creada exitosamente.';
          this.productosAgregados = [];
          this.totalVenta = 0;
          this.warningMessage = ''; // Limpiar mensaje de advertencia
        })
        .catch(error => {
          this.errorMessage = 'Error al guardar la venta: ' + error.message;
        });
    } else {
      this.errorMessage = 'No hay productos agregados.';
    }
  }
  irAPagina(event: Event, url: string) {
    event.preventDefault(); // Evita que el enlace redirija directamente
    this.router.navigateByUrl(url); // Navega a la ruta proporcionada
  }
}