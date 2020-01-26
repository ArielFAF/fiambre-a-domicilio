import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ListaProductosService {

  productList: AngularFireList<any>;

  selectedProduct: Product = new Product();

  constructor(private firebase: AngularFireDatabase) { }

  getProducts() {
    return this.productList = this.firebase.list('products', ref => ref.orderByChild('nombre'));
  }

  insertProduct(product: Product) {
    this.productList.push({
      nombre: product.nombre,
      precio: product.precio,
      cantidad: 0,
      imagen: '',
      peso: product.peso,
      por_mitad: product.por_mitad,
      activo: true
    });
  }

  updateProduct(product: Product) {
    this.productList.update(product.$key, {
      nombre: product.nombre,
      precio: product.precio,
      peso: product.peso,
      por_mitad: product.por_mitad,
      activo: product.activo
    });
  }

  deleteProduct($key: string) {
    this.productList.remove($key);
  }
}
