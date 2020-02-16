import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: Product[];

  constructor(
    public productService: ProductService, 
    private router: Router
    
    // private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.productService.getConfig();
    this.productService.getGastoEnvio();

    this.productService.selectedProducts = JSON.parse(localStorage.getItem("selectedProducts") || "[]");

    this.productService.selectedCount = 0;
    _.forEach(this.productService.selectedProducts,
      (p: any) => {
        this.productService.selectedCount = this.productService.selectedCount + p.cantidad;
      }
    );

    if(this.productService.inicio) {
    this.productService.getProducts()
      .snapshotChanges()
      .subscribe(item => {
        this.productService.products = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          if (x['activo']) {
            x['$key'] = element.key;
            this.productService.products.push(x as Product);
          }
        });
        // Saving
        localStorage.setItem("productList", JSON.stringify(this.productService.products));
      });
      this.productService.inicio = false;
    }

  }

  onDelete($key: string) {
    // this.productService.deleteProduct($key);
  }

  goCarrito() {
    this.productService.UpdateSelectedProducts();

    this.router.navigateByUrl('/carrito');
  }

}
