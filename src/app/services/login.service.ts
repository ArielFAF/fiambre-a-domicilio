import { Injectable } from '@angular/core';
import { Config } from '../models/config';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  configRecord: AngularFireList<any>;
  
  personaLogueada: boolean = false;

  config: Config;

  constructor(private firebase: AngularFireDatabase) { 
    this.personaLogueada = false; // localStorage.getItem('personaLogueada');
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
      });
    });
  }
}
