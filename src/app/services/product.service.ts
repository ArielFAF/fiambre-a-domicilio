import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: AngularFireList<any>;

  selectedProduct: Product = new Product();

  selectedCount: number = 0;

  constructor(private firebase: AngularFireDatabase) { }

  getProducts() {
    return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Product) {
    this.productList.push({
      nombre: product.nombre,
      // category: product.category,
      // location: product.location,
      // price: product.price
    });
  }

  updateProduct(product: Product) {
    this.productList.update(product.$key, {
      nombre: product.nombre,
      // category: product.category,
      // location: product.location,
      // price: product.price
    });
  }

  deleteProduct($key: string) {
    this.productList.remove($key);
  }
  
}
