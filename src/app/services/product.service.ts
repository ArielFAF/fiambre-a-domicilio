import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/product';
import * as _ from "lodash";
import { Config } from '../models/config';
import { Gasto } from '../models/gasto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: AngularFireList<any>;

  configRecord: AngularFireList<any>;

  selectedProducts: Product[];

  selectedCount: number = 0;

  products: Product[];

  costo_envio: Gasto = {$key: null, costo: 0, lugar: ""};

  total = 0;

  // textoBase: string = 'https://api.whatsapp.com/send?phone=5492216209330&text=Hola, quisiera hacer el siguiente pedido: ';
  textoBase: string = "https://wa.me/";
  textoIntermedio: string = "?text=Hola, quisiera hacer el siguiente pedido: ";

  textoPedido: string;

  config: Config;

  gasto: Gasto[];

  inicio: boolean = true;

  constructor(private firebase: AngularFireDatabase) { }

  getProducts() {
    // return this.productList = this.firebase.list('products');
    return this.productList = this.firebase.list('products',ref => ref.orderByChild('nombre'));
  }

  getConfig() {
    this.configRecord = this.firebase.list('config');
    
    this.firebase.list('config')
    .snapshotChanges()
    .subscribe(item => {
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.config = x as Config;
        // console.log(this.config);
      });
    });

  }

  getGastoEnvio() {
    
    this.firebase.list('gasto_envio')
    .snapshotChanges()
    .subscribe(item => {
      this.gasto = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.gasto.push(x as Gasto);
      });
    });

  }

  onChange(product: Product, cantidad: number) {
    let encontrado = false;
    
    if(!product.por_mitad) {
      if(cantidad>0) {
        cantidad = 1;
      } else {
        cantidad = -1;
      }
    }

    this.total = 0;
    this.costo_envio = {$key: null, costo: 0, lugar: ""};

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

  vaciarCarrito() {
    this.selectedCount = 0;
    this.selectedProducts = [];
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

    this.stringParaEnvio();
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

  updateConfig(config: Config) {
    this.configRecord.update(config.$key, {
      telefono: config.telefono,
      clave: config.clave
    });
  }

  deleteProduct($key: string) {
    this.total = 0;

    _.forEach(this.products,
      (p: Product) => {
        if(p.$key === $key) {
          this.selectedCount = this.selectedCount - p.cantidad;
          return;              
        }
      }
    );

    _.remove(this.selectedProducts, (p: any) => {
      return p.$key === $key
    });

    localStorage.setItem("selectedProducts", JSON.stringify(this.selectedProducts));
    this.stringParaEnvio();
  }

  stringParaEnvio() {
    let texto = this.textoBase + this.config.telefono + this.textoIntermedio;

    _.forEach(this.selectedProducts,
      (p: any) => {
        if (p.cantidad > 0) {
          texto = texto + p.nombre + " " + p.cantidad + " pieza/s; ";
        }
      }
    );

    texto = texto + "Lugar: " + this.costo_envio.lugar + ". Total: $" + this.total;

    this.textoPedido = texto.replace(/ /g,'%20');

  }
  
}
