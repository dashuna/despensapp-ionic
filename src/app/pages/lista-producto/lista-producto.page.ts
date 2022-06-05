import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/dtos';
import { ProductoService } from '../../services/producto.service';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryDTO } from '../../models/dtos';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.page.html',
  styleUrls: ['./lista-producto.page.scss'],
})
export class ListaProductoPage implements OnInit {

  productos: Producto[] = [];
  idInventory: Number;

  constructor(
    private productoService: ProductoService,
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { 
    this.idInventory = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('idInventario'));

  }

  ngOnInit() {
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

  borrarProducto(id: number): void {
    this.productoService.eliminar(id).subscribe(
      data => {
        this.presentToast(data.mensaje);
      },
      err => {
        this.presentToast(err.error.mensaje);
      }
    )
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
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
            // console.log('Confirm Okay');
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
}
