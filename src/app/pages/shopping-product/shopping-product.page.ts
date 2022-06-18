import { Component, OnInit } from '@angular/core';
import { ShoppingProductService } from '../../services/shopping.service';
import { ShoppingInventoryDTO, Producto, ShoppingProductDTO } from '../../models/dtos';
import { ProductoService } from '../../services/producto.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-shopping-product',
  templateUrl: './shopping-product.page.html',
  styleUrls: ['./shopping-product.page.scss'],
})
export class ShoppingProductPage implements OnInit {

  shoppingInventories: ShoppingInventoryDTO[] = [];

  constructor(
    private shoppingService: ShoppingProductService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    
   }

  ngOnInit() {
    this.loadShoppingInventories();
  }

  ionViewWillEnter() {
    this.loadShoppingInventories();
  }

  loadShoppingInventories() {
    this.shoppingService.getShopping().subscribe(
      data => {
        this.shoppingInventories = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )
  }
  
  modifyAmount(shoppingProductDTO: ShoppingProductDTO, diff: Number) {
    shoppingProductDTO.amount = shoppingProductDTO.amount.valueOf() + diff.valueOf();
    if(shoppingProductDTO.amount < 0) {
      shoppingProductDTO.amount = 0;
    }
    this.updateAmount(shoppingProductDTO);
  }

  updateAmount(shoppingProductDTO: ShoppingProductDTO) {
    this.shoppingService.updateAmountShoppingProduct(shoppingProductDTO).subscribe();
  }

  buyShoppingProduct(shoppingProduct: ShoppingProductDTO) {
    this.shoppingService.buyShoppingProduct(shoppingProduct.id).subscribe(
      data => {
        this.presentToast("Has comprado " + shoppingProduct.product.name);
      },
      err => {
        this.presentToast("Ha habido un error.");
      }
    );
  }

  deleteShoppingProduct(shoppingProduct: ShoppingProductDTO) {
    this.shoppingService.deleteShoppingProduct(shoppingProduct.id).subscribe(
      data => {
        this.presentToast("Has borrado " + shoppingProduct.product.name + " de la lista.");
        this.loadShoppingInventories();
      },
      err => {
        this.presentToast("Ha habido un error.");
      }
    );
  }

  async borrarConfirm(shoppingProduct: ShoppingProductDTO) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar',
      message: '¿Estás seguro que NO quieres comprar este producto?',
      buttons: [
        {
          text: 'Si',
          id: 'confirm-button',
          handler: () => {
             console.log('Confirm Okay');
            this.deleteShoppingProduct(shoppingProduct);
            
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
