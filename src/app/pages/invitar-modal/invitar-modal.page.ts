import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-invitar-modal',
  templateUrl: './invitar-modal.page.html',
  styleUrls: ['./invitar-modal.page.scss'],
})
export class InvitarModalPage {

  constructor(
    private modalController: ModalController
  ) { }

  dismissModal()  {
    this.modalController.dismiss();
  }

}
