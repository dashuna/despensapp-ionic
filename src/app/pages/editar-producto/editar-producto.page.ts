import { Component, Input, OnInit } from '@angular/core';
import { Producto, CategoryDTO, InventoryDTO } from '../../models/dtos';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { ToastController } from '@ionic/angular';
import { CategoryService } from '../../services/category.service';
import { InventoryService } from '../../services/inventory.service';

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
  

  constructor(
    private productService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private categoryService: CategoryService,
    private router: Router
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
        
      },
      err => {
        console.log(err);
      }
    )
  }

  updateProduct() {
    this.product.inventoryId = this.inventoryId;
    this.productService.updateProduct(this.product).subscribe(
      data => {
        this.presentToast();
        this.returnToList();
      },
      err => {
        this.presentToast();
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: "El producto se ha actualizado con éxito",
      color: 'dark',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

}
