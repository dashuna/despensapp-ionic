import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/dtos';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {

  producto: Producto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
  ) { }

  ngOnInit() {
    //al estar el servidor en local es muy rápido así que vamos a poner un metodo para verlo mas lento
    setTimeout(() => this.loadDetails(), 2000)
  }

  //necesitamos acceder al producto a partir del id que aparece en el navegador
  loadDetails(): void {
    //acceder al id que aparece en la direccion
    const id = this.activatedRoute.snapshot.params.id;
    // console.log(id);
    this.productoService.detailProduct(id).subscribe(
      data => {
        this.producto = data;
      },
      err => {
        // this.volver();
      }
    )
  }

}
