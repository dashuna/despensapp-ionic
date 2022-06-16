import { Component, OnInit } from '@angular/core';
import { ShoppingProductService } from '../../services/shopping.service';
import { ShoppingInventoryDTO, Producto, ShoppingProductDTO } from '../../models/dtos';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-shopping-product',
  templateUrl: './shopping-product.page.html',
  styleUrls: ['./shopping-product.page.scss'],
})
export class ShoppingProductPage implements OnInit {

  shoppingInventories: ShoppingInventoryDTO;

  constructor(
    private shoppingService: ShoppingProductService
  ) { }

  ngOnInit() {
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
}
