import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(public productService: ProductService, public router: Router) { }

  ngOnInit() {
  }

  enviar() {
    console.log(this.productService.textoPedido);

    this.productService.vaciarCarrito();
    
    this.router.navigateByUrl('/home');
  }

  calcularTotal() {
    this.productService.total = 0;

    _.forEach(this.productService.selectedProducts,
      (p: any) => {
        this.productService.total = this.productService.total + (p.precio * p.peso * p.cantidad);
      }
    );

    this.productService.total = this.productService.total + this.productService.costo_envio.costo;

    this.productService.stringParaEnvio();
  }

}
