import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, InventoryDTO, ShoppingProductDTO } from '../models/dtos';
import { InventoryService } from './inventory.service';
@Injectable({
    providedIn: 'root'
  })
  export class ProductoService {
  
    productoURL = SERVER_URL + '/product';
  
    constructor(
      private httpClient: HttpClient
    ) { }

    public getListaProductos(idInventario: Number): Observable<Producto[]> {
        return this.httpClient.get<Producto[]>(this.productoURL + `?idInventory=${idInventario}`);
    }

    public detailProduct(idProducto: Number): Observable<Producto> {
        return this.httpClient.get<Producto>(this.productoURL + `/${idProducto}`);
    }

    public createNewProduct(producto: Producto): Observable<any> {
        return this.httpClient.post<Producto>(this.productoURL, producto);
    }

    public updateProduct(producto: Producto): Observable<any> {
        return this.httpClient.post<any>(this.productoURL, producto);
    }

    public deleteProduct(idProducto: number): Observable<any> {
        return this.httpClient.delete<any>(this.productoURL + `/${idProducto}`);
    }

}
    