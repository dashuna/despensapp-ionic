import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitarModalPage } from './invitar-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InvitarModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitarModalPageRoutingModule {}
