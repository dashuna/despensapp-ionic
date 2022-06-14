import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { InventoryDTO, UserInventoryDTO } from '../../models/dtos';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  // inventories: InventoryDTO[] = [];
  inventories: UserInventoryDTO[] = [];
  inventory: UserInventoryDTO;

  constructor(
    private inventoryService: InventoryService,
  ) { }

  ngOnInit() {
    this.loadInventories();
  }

  ionViewWillEnter() {
    this.loadInventories();
    // this.isAccepted();
  }

  loadInventories() {
    this.inventoryService.getInventories().subscribe(
      data => {
        this.inventories = data;
        console.log(this.inventories);
      },
      err => {
        console.log(err);
      }
    )
  }

  // isAccepted() {
  //   this.inventoryService.getUserByInventory(this.inventory.id).subscribe(
  //     data => {
  //       console.log(data);
        
  //     },
  //     err => {

  //     }
  //   )
  // }

}
