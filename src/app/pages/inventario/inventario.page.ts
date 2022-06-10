import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { InventoryDTO } from '../../models/dtos';
import { ModalController } from '@ionic/angular';
import { InvitarModalPage } from '../invitar-modal/invitar-modal.page';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  inventories: InventoryDTO[] = [];

  constructor(
    private inventoryService: InventoryService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.loadInventories();
  }

  ionViewWillEnter() {
    this.loadInventories();
  }

  loadInventories() {
    this.inventoryService.getInventories().subscribe(
      data => {
        this.inventories = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: InvitarModalPage
    })

    await modal.present();
  }
}
