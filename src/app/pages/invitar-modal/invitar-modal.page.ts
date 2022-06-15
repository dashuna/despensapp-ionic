import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invitar-modal',
  templateUrl: './invitar-modal.page.html',
  styleUrls: ['./invitar-modal.page.scss'],
})
export class InvitarModalPage implements OnInit {
  @Input() idInventory: Number;
  username: string;

  constructor(
    private modalController: ModalController,
    private inventoryService: InventoryService,
  ) {
  }


  ngOnInit() {
    
  }

  sendInvitation() {
    this.inventoryService.sendInvitation(this.idInventory, this.username).subscribe(
      data => {
        console.log(data);
        
        this.dismissModal(true);
      },
      err => {
        this.dismissModal(false);
      }

    )
  }
  
  dismissModal(sended: boolean)  {
    const onClosedData: boolean = sended;
    this.modalController.dismiss(onClosedData);
  }

}
