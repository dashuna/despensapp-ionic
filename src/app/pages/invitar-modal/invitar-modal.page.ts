import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invitar-modal',
  templateUrl: './invitar-modal.page.html',
  styleUrls: ['./invitar-modal.page.scss'],
})
export class InvitarModalPage implements OnInit {

  idInventory: Number;
  user: string;

  constructor(
    private modalController: ModalController,
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.idInventory = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('idInventario'));
  }


  ngOnInit() {
    this.sendInvitation();
  }

  sendInvitation() {
    this.inventoryService.sendInvitation(this.idInventory, this.user).subscribe(
      data => {
        
      },
      err => {
        console.log(err);
      }
    )
  }
  
  dismissModal()  {
    this.modalController.dismiss();
  }

}
