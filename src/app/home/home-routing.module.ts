import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { //inventario
        path: 'inventario',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/inventario/inventario.module').then(
                (m) => m.InventarioPageModule
              ),
          },
          { //lista de productos
            path: ':idInventario/lista-producto',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('../pages/lista-producto/lista-producto.module').then(
                    (m) => m.ListaProductoPageModule
                  ),
              },
            ],
          },
          { //editar producto
            path: ':idInventario/lista-producto/:idProducto/editar',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import(
                    '../pages/editar-producto/editar-producto.module'
                  ).then((m) => m.EditarProductoPageModule),
              },
            ],
          },
          { // nuevo producto
            path: ':idInventario/lista-producto/nuevo',
            children: [
              {
              path: '',
              loadChildren: () => import('../pages/nuevo-producto/nuevo-producto.module').then( m => m.NuevoProductoPageModule)
            },
            ]
          },
          { // nuevo inventario
            path: 'nuevo',
            children: [
              {
                  path: '',
                  loadChildren: () => import('../pages/nuevo-inventario/nuevo-inventario.module').then( m => m.NuevoInventarioPageModule)
                }
            ]
          },
          { // usuarios del inventario
            path: ':idInventario/usuarios',
            children: [
              {
                  path: '',
                  loadChildren: () => import('../pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
                },
            ]
          }
        ],
      },
      { //lista de compra
        path: 'shopping',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/shopping-product/shopping-product.module').then(
                (m) => m.ShoppingProductPageModule
              ),
          },
        ],
      },
      // {
      //   path: '',
      //   redirectTo: '../pages/inventario',
      //   pathMatch: 'full'
      // }
    ],
  },
  // {
  //   path: '',
  //   redirectTo: '../pages/inventario',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
