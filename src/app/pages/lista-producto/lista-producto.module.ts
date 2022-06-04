import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaProductoPageRoutingModule } from './lista-producto-routing.module';

import { ListaProductoPage } from './lista-producto.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaProductoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListaProductoPage]
})
export class ListaProductoPageModule {}
