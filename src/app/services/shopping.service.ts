import { Injectable } from "@angular/core";
import { SERVER_URL } from '../../environments/environment';
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

    public insertShoppingProduct(shoppingProduct: ShoppingProductDTO): Observable<ShoppingProductDTO> {
        return this.httpClient.post<ShoppingProductDTO>(this.shoppingURL, shoppingProduct);
    }

    public getShopping(): Observable<ShoppingInventoryDTO> {
        return this.httpClient.get<ShoppingInventoryDTO>(this.shoppingURL);
    }

    public updateAmountShoppingProduct(shoppingProduct: ShoppingProductDTO): Observable<ShoppingProductDTO> {
        return this.httpClient.patch<ShoppingProductDTO>(this.shoppingURL, shoppingProduct);
    }

    public buyShoppingProduct(idShoppingProduct: Number): Observable<ShoppingProductDTO> {
        return this.httpClient.patch<ShoppingProductDTO>(this.shoppingURL + `/${idShoppingProduct}/buy`, null);
    }

    public deleteShoppingProduct(idShoppingProduct: Number): Observable<any> {
        return this.httpClient.delete<any>(this.shoppingURL + `/${idShoppingProduct}`);
    }
}