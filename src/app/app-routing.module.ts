import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'cliente', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
  { path: 'proveedor', loadChildren: () => import('./proveedor/proveedor.module').then(m => m.ProveedorModule) },
  { path: 'producto', loadChildren: () => import('./producto/producto.module').then(m => m.ProductoModule) },
  { path: 'notascredito', loadChildren: () => import('./notascredito/notascredito.module').then(m => m.NotasCreditoModule) },
  { path: 'venta', loadChildren: () => import('./venta/venta.module').then(m => m.VentaModule) }
  // Agrega aquí otras rutas de los modulos...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

