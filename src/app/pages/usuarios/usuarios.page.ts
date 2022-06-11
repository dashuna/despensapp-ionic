import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InvitarModalPage } from '../invitar-modal/invitar-modal.page';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from '../../models/dtos';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  
  idInventory: Number;
  guests: UserDTO[] = [];

  constructor(
    private modalController: ModalController,
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.idInventory = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('idInventario'));
   }

  ngOnInit() {
    this.loadListGuests();
  }

  loadListGuests(): void {
    this.inventoryService.getUsersByInventory(this.idInventory).subscribe(
      data => {
        this.guests = data;
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

  // const alert = await this.alertController.create({header: 'Success', message: 'Su invitación se ha enviado con éxito', buttons: ['Cancelar']});
  // await alert.present();
}
