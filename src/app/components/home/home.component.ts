import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

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

  ngOnInit() {
    this.productService.getProducts()
    .snapshotChanges()
    .subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        x['cantidad'] = 0;
        this.productList.push(x as Product);
      });
    });
  }

  onAdd(product: Product) {
    this.productService.selectedCount = this.productService.selectedCount + 1;
  }

  onDelete($key: string) {
      // this.productService.deleteProduct($key);
  }

  goCarrito() {
    this.router.navigateByUrl('/carrito');
  }
}
