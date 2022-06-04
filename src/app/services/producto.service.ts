import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, InventoryDTO } from '../models/dtos';
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

    public detalle(id: number): Observable<Producto> {
        return this.httpClient.get<Producto>(this.productoURL + `detail/${id}`);
    }

    public nuevo(producto: Producto): Observable<any> {
        return this.httpClient.post<any>(this.productoURL + 'create', producto);
    }

    public actualizar(id: number, producto: Producto): Observable<any> {
        return this.httpClient.put<any>(this.productoURL + `update/${id}`, producto);
    }

    public eliminar(id: number): Observable<any> {
        return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
    }
}
    