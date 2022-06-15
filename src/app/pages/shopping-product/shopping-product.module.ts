import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingProductPageRoutingModule } from './shopping-product-routing.module';

import { ShoppingProductPage } from './shopping-product.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingProductPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ShoppingProductPage]
})
export class ShoppingProductPageModule {}
