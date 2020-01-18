import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  constructor(public productService: ProductService, public router: Router ) { }

  ngOnInit() {
    this.productService.getConfig();
  }

  onSubmit(administracionForm: NgForm) {
      this.productService.updateConfig(administracionForm.value); 
    
    this.router.navigateByUrl('/home');
  }

}
