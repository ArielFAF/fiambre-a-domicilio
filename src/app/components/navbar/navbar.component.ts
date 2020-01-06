import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private location: Location, public productService: ProductService,public router: Router) { }
  public app_name = 'Books Store';
  public isLogged = false;

  ngOnInit() {
    this.onCheckUser();
  }

  onLogout(): void {
    location.reload();
  }

  onCheckUser(): void {
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }
}
