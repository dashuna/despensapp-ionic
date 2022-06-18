import { Component, OnInit, Input } from '@angular/core';
import { Producto, ShoppingInventoryDTO, ShoppingProductDTO } from 'src/app/models/dtos';
import { ProductoService } from '../../services/producto.service';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { InventoryDTO, UserNameDTO } from '../../models/dtos';
import { AlertController, ToastController } from '@ionic/angular';
import { ShoppingProductService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.page.html',
  styleUrls: ['./lista-producto.page.scss'],
})
export class ListaProductoPage implements OnInit {

  productos: Producto[] = [];
  idInventory: Number;
  defaultBackLink: string;
  shoppingProduct: ShoppingProductDTO;
  isAdmin: boolean;

  constructor(
    private productoService: ProductoService,
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private shoppingService: ShoppingProductService
  ) { 
    this.idInventory = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('idInventario'));
  }

  ngOnInit() {
    this.cargarListaProductos();
    this.getAdmin();
  }

  //para que se actualice la pagina con los cambios realizados
  ionViewWillEnter() {
    this.cargarListaProductos();
  }

  cargarListaProductos(): void {
    this.productoService.getListaProductos(this.idInventory).subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
        // this.volver();
      }
    )
  }

  borrarProducto(idProducto: number): void {
    this.productoService.deleteProduct(idProducto).subscribe(
      data => {
        this.cargarListaProductos();
        this.presentToast("El producto se ha borrado correctamente!");
      },
      err => {
        this.presentToast("Se ha producido un error.");
      }
    )
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

   //para que nos salga un alert cuando vayamos a borrar un producto
   async borrarConfirm(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar',
      message: '¿Estás seguro que lo deseas eliminar?',
      buttons: [
        {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
             console.log('Confirm Okay');
            this.borrarProducto(id);
          }
        },
        {
          text: 'Cancelar',
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

  // editarProducto(idProducto: Number) {
  //   this.router.navigate(['/inventario/'+this.idInventory+'/lista-producto/'+idProducto+'/editar']);
  // }

  addToShopping(product, data) {

    this.shoppingProduct = new ShoppingProductDTO(product, null, null, data.unidades, false, null, null);

    // this.amount = 
    this.shoppingService.insertShoppingProduct(this.shoppingProduct).subscribe(
      data => {
        this.presentToast("El producto se ha añadido a la lista de la compra.");
        this.shoppingProduct = data;
      }, 
      err => {
        console.log("Error");
        this.presentToast("Este producto ya está en la lista de la compra.")
      }
    )
  }

  async alertShopping(product) {
    const alert = await this.alertController.create({
      header: 'Indica las unidades que necesitas.',
      message: '',
      inputs: [
        {
          name: 'unidades',
          type: 'number',
          placeholder: 'Unidades',
          value: 1
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Añadir',
          handler: (data) => {
            console.log('Confirm Ok');
            this.addToShopping(product,data);
          }
        }
      ],
    });

    await alert.present();
  }

getAdmin() {
  this.inventoryService.getUserByInventory(this.idInventory).subscribe(
    data => {
      console.log(data);
      this.isAdmin = data.admin;
      console.log(this.isAdmin);
    }
  );
}
}


