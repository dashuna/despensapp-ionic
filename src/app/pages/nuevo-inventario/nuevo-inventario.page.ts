import { Component, OnInit } from '@angular/core';
import { InventoryDTO } from '../../models/dtos';
import { InventoryService } from '../../services/inventory.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-inventario',
  templateUrl: './nuevo-inventario.page.html',
  styleUrls: ['./nuevo-inventario.page.scss'],
})
export class NuevoInventarioPage implements OnInit {

  inventory: InventoryDTO;
  id = null;
  name = "";

  constructor(
    private inventoryService: InventoryService,
    private toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  createInventory() {
    this.inventory = new InventoryDTO(this.id, this.name);

    this.inventoryService.createNewInventory(this.inventory).subscribe(
      data => {
        this.presentToast(data.mensaje);
        this.returnToList();
      },
      err => {
        this.presentToast(err.error.mensaje);
      }
    )
  }

  async presentToast(mensaje: String) {
    const toast = await this.toastController.create({
      message: "El inventario se ha creado con éxito",
      // color: 'dark',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  returnToList() {
    this.router.navigate(['inventario']);
  }

}
