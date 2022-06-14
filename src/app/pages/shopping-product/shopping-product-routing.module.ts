import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingProductPage } from './shopping-product.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingProductPageRoutingModule {}
