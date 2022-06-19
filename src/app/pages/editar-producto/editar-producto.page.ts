import { Component, Input, OnInit } from '@angular/core';
import { Producto, CategoryDTO, InventoryDTO, ShoppingProductDTO } from '../../models/dtos';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { ToastController, AlertController } from '@ionic/angular';
import { CategoryService } from '../../services/category.service';
import { InventoryService } from '../../services/inventory.service';
import { ShoppingProductService } from '../../services/shopping.service';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {

  idProducto: Number;
  inventoryId: Number;
  product: Producto = new Producto("","", new CategoryDTO(null, null), null, null, null);
  categoryId: Number = 0;
  categories: CategoryDTO[] = [];
  // name = "";
  // description = "";
  // categories: CategoryDTO[] = [];
  // categoryId: Number = 0;
  // photo = null;
  // amount = null;

  selectedImage: any;
  userImg: any = '';
  

  constructor(
    private productService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private categoryService: CategoryService,
    private router: Router,
    private alertController: AlertController,
    private shoppingService: ShoppingProductService
  ) {
    this.idProducto = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('idProducto'));
    this.inventoryId = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('idInventario'));
   }

  ngOnInit() {
    this.loadProductById();
    this.loadCategories();
  }

  loadProductById() {
    this.productService.detailProduct(this.idProducto).subscribe(
      data => {
        this.product = data;
        if (this.product.photo == null) {
          this.userImg = 'assets/images/no-product.jpg';
        } else {
          this.userImg = 'data:image/jpg;base64,' + this.product.photo;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  updateProduct() {
    if (this.product.amount < 0) {
      this.presentToast("La cantidad no puede ser negativa.");
      return 0;
    }
    this.product.inventoryId = this.inventoryId;
    if (this.selectedImage != null) {
      this.product.photo = this.cleanBase64(this.selectedImage.webPath)
    }
    this.productService.updateProduct(this.product).subscribe(
      data => {
        this.presentToast("El producto se ha actualizado con éxito.");

        if (this.product.amount==0) {
          this.alertAmount(this.product, 1);
        }

        this.returnToList();
      },
      err => {
        this.presentToast("Algo ha salido mal.");
      }
    )
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
     data => {
      this.categories = data;
    },
    err => {
      console.log(err);
    }
    )
  }

  selectCategory(idCategory: Number) {
    console.log(idCategory);
  }

  returnToList() {
    this.router.navigate(['/inventario/'+this.inventoryId+'/lista-producto']);
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

  async alertAmount(product, amount) {
    const alert = await this.alertController.create({
      header: '¡Tu producto ' + product.name + ' está vacío!',
      message: '¿Deseas añadirlo a la lista de la compra?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          id: 'confirm-button',
          handler: () => {
            this.addToShopping(product, amount);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  addToShopping(product, amount) {

    let shoppingProduct = new ShoppingProductDTO(product, null, null, amount, false, null, null);

    // this.amount = 
    this.shoppingService.insertShoppingProduct(shoppingProduct).subscribe(
      data => {
        this.presentToast("El producto se ha añadido a la lista de la compra.");
        shoppingProduct = data;
      }, 
      err => {
        console.log("Error");
        this.presentToast("Este producto ya está en la lista de la compra.")
      }
    )
  }

  
  checkPlatformForWeb() {
    return (Capacitor.getPlatform() === 'web' || Capacitor.getPlatform() === 'ios');
  }

  async getPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Prompt,
      width: 600,
      resultType: this.checkPlatformForWeb() ? CameraResultType.DataUrl : CameraResultType.Uri
    });
    console.log('image: ', image);
    this.userImg = image.dataUrl;
    this.selectedImage = image;
    if (this.checkPlatformForWeb()) {
     this.selectedImage.webPath = image.dataUrl;
    }
  }

  cleanBase64(base64: string): string {
    return base64.split(',')[1];
  }

}
