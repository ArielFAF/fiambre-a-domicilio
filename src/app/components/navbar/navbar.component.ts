import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import * as _ from "lodash";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  busqueda: string = '';
  constructor(private location: Location, public productService: ProductService, public router: Router) { }

  ngOnInit() {
    this.onCheckUser();
  }

  onLogout(): void {
    location.reload();
  }

  onCheckUser(): void {
  }

  goHome(buscar: boolean = false) {
    this.productService.products = [];

    if (buscar) {
      
      const list = JSON.parse(localStorage.getItem("productList") || "[]");

      _.forEach(list,
        (p: any) => {
          const b = p.nombre.search(this.busqueda);
          if (p.nombre.toLowerCase().search(this.busqueda.toLowerCase()) > -1) {
            // this.productService.products.push(p as Product);
            this.productService.products.push(p);
          }
        }
      );
    } else {
      this.productService.products = JSON.parse(localStorage.getItem("productList") || "[]");
    }

    this.router.navigateByUrl('/home');
  }
}
