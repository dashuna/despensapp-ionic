import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoInventarioPageRoutingModule } from './nuevo-inventario-routing.module';

import { NuevoInventarioPage } from './nuevo-inventario.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoInventarioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NuevoInventarioPage]
})
export class NuevoInventarioPageModule {}
