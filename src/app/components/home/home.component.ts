import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
import * as _ from "lodash";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: Product[];

  constructor(public productService: ProductService, private router: Router
    // private toastr: ToastrService
    ) { }

    // // Loading
    // var users = JSON.parse(localStorage.getItem("users") || "[]");
    // console.log("# of users: " + users.length);
    // users.forEach(function(user, index) {
    //     console.log("[" + index + "]: " + user.id);
    // });

    // // Modifying
    // var user = {
    //     id: Math.floor(Math.random() * 1000000)
    // };
    // users.push(user);
    // console.log("Added user #" + user.id);

    // // Saving
    // localStorage.setItem("users", JSON.stringify(users));

  ngOnInit() {
    this.productService.selectedProducts = JSON.parse(localStorage.getItem("selectedProducts") || "[]");

    this.productService.selectedCount = 0;
    _.forEach(this.productService.selectedProducts,
      (p: any) => {
        this.productService.selectedCount = this.productService.selectedCount + p.cantidad;
      }
    );

    this.productService.getProducts()
    .snapshotChanges()
    .subscribe(item => {
      this.productService.products = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.productService.products.push(x as Product);
      });
      // Saving
      localStorage.setItem("productList", JSON.stringify(this.productService.products));
    });
    
  }

  // onChange(product: Product, cantidad: number) {
  //   let encontrado = false;

  //   _.forEach(this.productService.selectedProducts,
  //     (p: any) => {
  //       if (p.$key === product.$key) {
  //         p.cantidad = p.cantidad + cantidad;
  //         encontrado = true;
  //         return false;
  //       }
  //     }
  //   );

  //   if(!encontrado) {
  //     product.cantidad = cantidad;
  //     this.productService.selectedProducts.push(product);
  //   }

  //   this.productService.selectedCount = this.productService.selectedCount + cantidad;

  //   localStorage.setItem("selectedProducts", JSON.stringify(this.productService.selectedProducts));
  // }

  onDelete($key: string) {
      // this.productService.deleteProduct($key);
  }

  goCarrito() {
    this.productService.UpdateSelectedProducts();

    this.router.navigateByUrl('/carrito');
  }
}
