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


//firebase 
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { FooterComponent } from './components/footer/footer.component';

//componets

//services
import {ProductService} from './services/product.service';
import { AdministracionComponent } from './components/administracion/administracion.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'administracion', component: AdministracionComponent }
];

registerLocaleData(localeEs, 'es-AR');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CarritoComponent,
    FooterComponent,
    AdministracionComponent
    // ProductsComponent
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
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
