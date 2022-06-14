import { Injectable } from "@angular/core";
import { SERVER_URL } from '../../environments/environment.raspi';
import { ShoppingInventoryDTO, ShoppingProductDTO } from '../models/dtos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingProductService {
    shoppingURL = SERVER_URL + '/shopping';

    constructor(
        private httpClient: HttpClient,
    ) {}

    public insertShoppingProduct(shoppingProduct: ShoppingProductDTO): Observable<any> {
        return this.httpClient.post<any>(this.shoppingURL + shoppingProduct, null);
    }

    public getShopping(): Observable<ShoppingInventoryDTO> {
        return this.httpClient.get<ShoppingInventoryDTO>(this.shoppingURL);
    }
}