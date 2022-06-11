import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../environments/environment';
import { InventoryDTO, UserDTO } from '../models/dtos';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class InventoryService {
  
    inventoryURL = SERVER_URL + '/inventory';
  
    constructor(
      private httpClient: HttpClient
    ) { }

    public getInventories(): Observable<InventoryDTO[]> {
        return this.httpClient.get<InventoryDTO[]>(this.inventoryURL);
    }

    public createNewInventory(inventory: InventoryDTO): Observable<any> {
      return this.httpClient.post<InventoryDTO>(this.inventoryURL, inventory);
    }

    public getUsersByInventory(idInventory: Number): Observable<UserDTO[]> {
      return this.httpClient.get<UserDTO[]>(this.inventoryURL + `/${idInventory}/users`);
  }


}