import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { InventoryDTO, UserInventoryDTO } from '../../models/dtos';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  // inventories: InventoryDTO[] = [];
  inventories: UserInventoryDTO[] = [];
  hasInvitations: boolean = false;
  isLogged = false;

  constructor(
    private inventoryService: InventoryService,
    private toastController: ToastController,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.tokenService.getLoggedObs().subscribe((value) => {
      if (value) {
        this.loadInventories();
      }
    });
   }

  ngOnInit() {
    this.comprobarLogin();
    this.loadInventories();
  }

  ionViewWillEnter() {
    if (this.tokenService.getToken() == null) {
      this.router.navigate(['/login']);
    }
    this.loadInventories();
  }


  public loadInventories() {
    this.inventoryService.getInventories().subscribe(
      data => {
        this.inventories = data;

        this.hasInvitations = this.inventories.some(inv => !inv.accepted);
        console.log(this.inventories);
      },
      err => {
        console.log(err);
      }
    )
  }

  updateInvitation(userInventoryId: Number, accepted: boolean) {
    const userInventory = new UserInventoryDTO(userInventoryId, null, accepted, null);
    this.inventoryService.updateInvitation(userInventory).subscribe(
      data => {
        if(accepted) {
          this.presentToast("El inventario ha sido Aceptado!");
        } else {
        this.presentToast("El inventario ha sido Rechazado!");
        }
        this.loadInventories();
      },
      err => {
        this.presentToast("No se ha podido actualizar el estado de tu Inventario!");
        console.log(err);
      }
    )
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      // color: 'dark',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  logOut() {
    this.tokenService.logOut();
    this.isLogged = false;
    this.router.navigate(['/login']);
  }

  comprobarLogin() {
    if (this.tokenService.isLogged()) {
      this.isLogged = true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
