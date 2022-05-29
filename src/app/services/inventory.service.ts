import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../environments/environment';
import { InventoryDTO } from '../models/dtos';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class InventoryService {
  
    inventoryURL = SERVER_URL + '/inventory/';
  
    constructor(
      private httpClient: HttpClient
    ) { }

    public getInventories(): Observable<InventoryDTO[]> {
        return this.httpClient.get<InventoryDTO[]>(this.inventoryURL);
      }

}