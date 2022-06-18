import { Component, OnInit } from '@angular/core';
import { Producto, CategoryDTO } from '../../models/dtos';
import { ProductoService } from '../../services/producto.service';
import { CategoryService } from '../../services/category.service';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.page.html',
  styleUrls: ['./nuevo-producto.page.scss'],
})
export class NuevoProductoPage implements OnInit {

  product: Producto;
  name = "";
  description = "";
  categories: CategoryDTO[] = [];
  categoryId: Number = 0;
  // inventories: InventoryService[] = [];
  amount = null;
  inventoryId: Number;

  selectedImage: any;
  userImg: any = '';

  constructor(
    private productService: ProductoService,
    private categoryService: CategoryService,
    private toastController: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.inventoryId = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('idInventario'));
    this.userImg = 'assets/images/no-product.jpg';
  }

  ngOnInit() {
    this.loadCategories();
  }

  createProduct() {
    const categorySelected = new CategoryDTO(this.categoryId, null);
    this.product = new Producto(this.name,
       this.description,
        categorySelected,
         this.cleanBase64(this.selectedImage.webPath),
          this.inventoryId,
           this.amount);
    // console.log(this.product);

    this.productService.createNewProduct(this.product).subscribe(
      data => {
        this.presentToast(data.mensaje);
        this.returnToList();
      },
      err => {
        this.presentToast(err.error.mensaje);
      }
    );

  }

  cleanBase64(base64: string): string {
    return base64.split(',')[1];
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  selectCategory(idCategory: Number) {
    console.log(idCategory);
  }

  async presentToast(mensaje: String) {
    const toast = await this.toastController.create({
      message: "El producto se ha creado con éxito",
      // color: 'dark',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  returnToList() {
    this.router.navigate(['/inventario/'+this.inventoryId+'/lista-producto']);
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
}
