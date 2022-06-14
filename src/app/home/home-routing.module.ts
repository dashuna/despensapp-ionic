import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
//     children: [
//       {
//         path: 'inventario',
//         children: [
//           {
//             path: '',
//             loadChildren: () => import('../pages/inventario/inventario.module').then(m =>m.InventarioPageModule)
//           }
//       ]
//       },
//       {
//         path: 'shopping-product',
//         children: [
//           {
//             path: '',
//             loadChildren: () => import('../pages/shopping-product/shopping-product.module').then(m =>m.ShoppingProductPageModule)
//           }
//       ]
//       },
//       {
//         path: '',
//         redirectTo: '../pages/inventario',
//         pathMatch: 'full'
//       }
//     ]
//   },
//   {
//     path: '',
//     redirectTo: '../pages/inventario',
//     pathMatch: 'full'
   }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
