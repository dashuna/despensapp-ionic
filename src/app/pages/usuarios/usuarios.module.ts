import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import { UsuariosPage } from './usuarios.page';
import { InvitarModalPage } from '../invitar-modal/invitar-modal.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UsuariosPage,InvitarModalPage],
  entryComponents: [InvitarModalPage]
})
export class UsuariosPageModule {}
