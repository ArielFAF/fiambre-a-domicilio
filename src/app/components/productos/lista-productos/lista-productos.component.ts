import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ListaProductosService } from 'src/app/services/lista-productos.service';

import { Inject} from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  productList: Product[];

  constructor(private listaProductosService: ListaProductosService
    // @Inject(DOCUMENT) private document: Document
    ) { }

  ngOnInit() {
    this.listaProductosService.getProducts()
    .snapshotChanges()
    .subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.productList.push(x as Product);
      });
    });
  }

  onEdit(product: Product) {
    this.listaProductosService.selectedProduct = Object.assign({},product);
    // this.document.body.scrollTop = 0;
    window.scrollTo(0,0);
  }

  onDelete($key: string) {
    if(confirm('Esta seguro de eliminar?')) {
      this.listaProductosService.deleteProduct($key);
    }
  }

}
