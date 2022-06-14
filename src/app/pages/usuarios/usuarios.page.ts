import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  imAdmin: boolean;

  constructor(
    private modalController: ModalController,
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.idInventory = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('idInventario'));
   }

  ngOnInit() {
    this.loadUsers();
    this.isAdmin();
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

  isAdmin() {
    this.inventoryService.getUserByInventory(this.idInventory).subscribe(
      data => {
        console.log(data);
        this.user = data;
        console.log(this.user);
        this.imAdmin = data.accepted;
        console.log(this.user.isAdmin)
        
      },
      err => {

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