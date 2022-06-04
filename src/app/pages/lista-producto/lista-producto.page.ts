import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/dtos';
import { ProductoService } from '../../services/producto.service';
import { InventoryService } from '../../services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryDTO } from '../../models/dtos';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.page.html',
  styleUrls: ['./lista-producto.page.scss'],
})
export class ListaProductoPage implements OnInit {

  productos: Producto[] = [];
  idInventory: Number;

  constructor(
    private productoService: ProductoService,
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.idInventory = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('idInventario'));

  }

  ngOnInit() {
    this.cargar();
  }

  cargar(): void {
    
    this.productoService.getListaProductos(this.idInventory).subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
        // this.volver();
      }
    )
  }
}
