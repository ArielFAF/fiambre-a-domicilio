import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListaProductosService } from 'src/app/services/lista-productos.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(public listaProductosService: ListaProductosService
    // private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.listaProductosService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm: NgForm) {
    if (productForm.value.$key == null) {
      if (productForm.value.nombre != null) {
        this.listaProductosService.insertProduct(productForm.value);
      }
    }
    else {
      this.listaProductosService.updateProduct(productForm.value);
    }
    this.resetForm(productForm);
  }

  resetForm(productForm?: NgForm) {
    if (productForm != null) {
      productForm.reset();
      this.listaProductosService.selectedProduct = new Product();
    }
  }

}
