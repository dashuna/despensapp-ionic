import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { InvitarModalPage } from '../invitar-modal/invitar-modal.page';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute } from '@angular/router';
import { UserDTO, UserInventoryDTO } from '../../models/dtos';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  
  idInventory: Number;
  users: UserDTO[] = [];
  user: UserInventoryDTO;

  constructor(
    private modalController: ModalController,
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
  ) {
    this.idInventory = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('idInventario'));
   }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.inventoryService.getUsersByInventory(this.idInventory).subscribe(
      data => {
        this.users = data;
        // console.log(this.users);
      },
      err => {
        console.log(err);
      }
    )
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: InvitarModalPage,
      componentProps: {
        'idInventory': this.idInventory
      }
    })

    modal.onDidDismiss().then((dataReturned) => {
      if(dataReturned.data) {
        this.presentToast("Se ha enviado la invitacion");
      } else {
        this.presentToast("No se ha enviado la invitacion");
      }
    });

    await modal.present();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  // const alert = await this.alertController.create({header: 'Success', message: 'Su invitación se ha enviado con éxito', buttons: ['Cancelar']});
  // await alert.present();
}
