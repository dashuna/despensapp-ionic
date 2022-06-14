import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    //no hace falta estar logueado
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'inventario/:idInventario/lista-producto/nuevo',
    loadChildren: () => import('./pages/nuevo-producto/nuevo-producto.module').then( m => m.NuevoProductoPageModule)
  },
  {
    path: 'inventario/:idInventario/lista-producto/:idProducto/editar',
    loadChildren: () => import('./pages/editar-producto/editar-producto.module').then( m => m.EditarProductoPageModule)
  },
  {
    path: 'inventario/:idInventario/lista-producto/detalle/:idProducto',
    loadChildren: () => import('./pages/detalle-producto/detalle-producto.module').then( m => m.DetalleProductoPageModule)
  },
  {
    path: 'inventario',
    loadChildren: () => import('./pages/inventario/inventario.module').then( m => m.InventarioPageModule)
  },
  {
    path: 'inventario/:idInventario/lista-producto',
    loadChildren: () => import('./pages/lista-producto/lista-producto.module').then( m => m.ListaProductoPageModule)
  },
  {
    path: 'inventario/nuevo',
    loadChildren: () => import('./pages/nuevo-inventario/nuevo-inventario.module').then( m => m.NuevoInventarioPageModule)
  },
  {
    path: 'invitar-modal',
    loadChildren: () => import('./pages/invitar-modal/invitar-modal.module').then( m => m.InvitarModalPageModule)
  },
  {
    path: 'inventario/:idInventario/usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'shopping-product',
    loadChildren: () => import('./pages/shopping-product/shopping-product.module').then( m => m.ShoppingProductPageModule)
  },
  // {
  //   path: '**',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }