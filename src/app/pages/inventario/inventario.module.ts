import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventarioPageRoutingModule } from './inventario-routing.module';

import { InventarioPage } from './inventario.page';
import { ComponentsModule } from '../../components/components.module';
import { InvitarModalPage } from '../invitar-modal/invitar-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventarioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InventarioPage, InvitarModalPage],
  entryComponents: [InvitarModalPage]
})
export class InventarioPageModule {}
