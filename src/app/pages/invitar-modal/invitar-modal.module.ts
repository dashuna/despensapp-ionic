import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitarModalPageRoutingModule } from './invitar-modal-routing.module';

import { InvitarModalPage } from './invitar-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitarModalPageRoutingModule
  ],
  declarations: [InvitarModalPage]
})
export class InvitarModalPageModule {}
