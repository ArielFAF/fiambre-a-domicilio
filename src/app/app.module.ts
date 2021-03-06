import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//firebase 
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';

//componets
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoComponent } from './components/productos/producto/producto.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
import { EnviosComponent } from './components/envios/envios.component';
import { ListaEnviosComponent } from './components/envios/lista-envios/lista-envios.component';
import { EnvioComponent } from './components/envios/envio/envio.component';
import { LoginComponent } from './components/login/login.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { AcercaComponent } from './components/acerca/acerca.component';

//services
import {ProductService} from './services/product.service';
import { ListaProductosService } from './services/lista-productos.service';
import { EnviosService } from './services/envios.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'administracion', component: AdministracionComponent },
  { path: 'lista-productos', component: ProductosComponent },
  { path: 'envios', component: EnviosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'acerca', component: AcercaComponent }
];

registerLocaleData(localeEs, 'es-AR');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CarritoComponent,
    FooterComponent,
    AdministracionComponent,
    ProductosComponent,
    ProductoComponent,
    ListaProductosComponent,
    EnviosComponent,
    ListaEnviosComponent,
    EnvioComponent,
    LoginComponent,
    AyudaComponent,
    AcercaComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-AR'},
    ProductService,
    ListaProductosService,
    EnviosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
