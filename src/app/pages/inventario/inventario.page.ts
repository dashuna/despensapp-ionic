import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { InventoryDTO } from '../../models/dtos';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  inventories: InventoryDTO[] = [];

  constructor(
    private inventoryService: InventoryService,
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

}
