import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoInventarioPage } from './nuevo-inventario.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoInventarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoInventarioPageRoutingModule {}
