import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/product';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: AngularFireList<any>;

  selectedProducts: Product[];

  selectedCount: number = 0;

  products: Product[];

  textoBase: string = 'https://api.whatsapp.com/send?phone=5492216209330&text=Hola, quisiera hacer el siguiente pedido: ';

  textoPedido: string;

  constructor(private firebase: AngularFireDatabase) { }

  getProducts() {
    return this.productList = this.firebase.list('products');
  }

  onChange(product: Product, cantidad: number) {
    let encontrado = false;

    _.forEach(this.selectedProducts,
      (p: any) => {
        if (p.$key === product.$key) {
          p.cantidad = p.cantidad + cantidad;
          if(p.cantidad <= 0) {
            this.deleteProduct(p.$key);
          }
          encontrado = true;
          return false;
        }
      }
    );

    if(!encontrado) {
      product.cantidad = cantidad;
      this.selectedProducts.push(product);
    }

    this.selectedCount = this.selectedCount + cantidad;

    localStorage.setItem("selectedProducts", JSON.stringify(this.selectedProducts));
    this.stringParaEnvio();
  }

  UpdateSelectedProducts() {
    _.forEach(this.selectedProducts,
      (sp: Product) => {
        
        _.forEach(this.products,
          (p: Product) => {
            if(p.$key === sp.$key) {
              sp.precio = p.precio;
              return false;              
            }
          }
        );

      }
    );
  }

  Add(product:Product, cantidad: number) {

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

    _.remove(this.selectedProducts, (p: any) => {
      return p.$key === $key
    });

    localStorage.setItem("selectedProducts", JSON.stringify(this.selectedProducts));
    this.stringParaEnvio();
  }

  stringParaEnvio() {
    let texto = this.textoBase;

    _.forEach(this.selectedProducts,
      (p: any) => {
        if (p.cantidad > 0) {
          texto = texto + p.nombre + " " + p.cantidad + " pieza/s; ";
        }
      }
    );

    this.textoPedido = texto;

  }
  
}
