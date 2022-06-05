import { Component, OnInit } from '@angular/core';
import { Producto, CategoryDTO } from '../../models/dtos';
import { ProductoService } from '../../services/producto.service';
import { CategoryService } from '../../services/category.service';
import { InventoryService } from '../../services/inventory.service';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

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
  photo = null;
  // inventories: InventoryService[] = [];
  amount = null;
  inventoryId: Number;


  constructor(
    private productService: ProductoService,
    private categoryService: CategoryService,
    private toastController: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.inventoryId = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('idInventario'));

  }

  ngOnInit() {
    this.loadCategories();
  }

  createProduct() {
    const categorySelected = new CategoryDTO(this.categoryId, null);  
    this.product = new Producto(this.name, this.description, categorySelected, this.photo, this.inventoryId, this.amount);
    console.log(this.product);
    
    this.productService.createNewProduct(this.product).subscribe(
      data => {
        this.presentToast(data.mensaje);
        this.returnToList();
      },
      err => {
        this.presentToast(err.error.mensaje);

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

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  returnToList() {
    this.router.navigate(['/inventario/'+this.inventoryId+'/lista-producto']);
  }

}
