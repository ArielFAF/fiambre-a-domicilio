import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // personas: any[] = [{ text: 'Elena', valor: 'Elena' }, { text: 'Gerardo', valor: 'Gerardo' }];

  parametros: any = {
    clave: ''
  };

  logueado: boolean = false;

  constructor(
    private router: Router, 
    public loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getConfig();
  }

  ingresar() {
    // console.log("entro a ingreso");
    // $('#carrito').trigger('click');
    console.log("paso el click simulado");
    this.loginService.personaLogueada = false;
    if(this.parametros.clave === this.loginService.config.clave) {
      this.loginService.personaLogueada = true;
      this.router.navigateByUrl('/home');
    } else {
      alert("Error en la clave");
    }
    this.parametros.clave = '';
  }

  goCarrito() {
    console.log("entro al carrito");
    // alert('carrito');
  }
}
