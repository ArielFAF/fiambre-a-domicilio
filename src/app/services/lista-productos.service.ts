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
      imagen: 'https://firebasestorage.googleapis.com/v0/b/fiambre-a-domicilio.appspot.com/o/logo-192x192.png?alt=media&token=531475c8-f835-443e-9027-b50528e59d64',
      peso: product.peso,
      por_mitad: (typeof product.por_mitad == "undefined" || product.por_mitad == null) ? false : product.por_mitad,
      activo: (typeof product.activo == "undefined" || product.activo == null) ? false : product.activo
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
