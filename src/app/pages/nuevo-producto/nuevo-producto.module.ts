import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoProductoPageRoutingModule } from './nuevo-producto-routing.module';

import { NuevoProductoPage } from './nuevo-producto.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoProductoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NuevoProductoPage]
})
export class NuevoProductoPageModule {}
