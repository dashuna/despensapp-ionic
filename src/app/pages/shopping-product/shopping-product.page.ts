import { Component, OnInit } from '@angular/core';
import { ShoppingProductService } from '../../services/shopping.service';
import { ShoppingInventoryDTO } from '../../models/dtos';

@Component({
  selector: 'app-shopping-product',
  templateUrl: './shopping-product.page.html',
  styleUrls: ['./shopping-product.page.scss'],
})
export class ShoppingProductPage implements OnInit {

  shoppingInventories: ShoppingInventoryDTO;

  constructor(
    private shoppingService: ShoppingProductService,
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
}
