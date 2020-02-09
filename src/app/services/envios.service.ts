import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Gasto } from '../models/gasto';

@Injectable({
  providedIn: 'root'
})
export class EnviosService {

  gastoList: AngularFireList<any>;

  selectedGasto: Gasto = new Gasto();

  constructor(private firebase: AngularFireDatabase) { }

  getEnvios() {
    return this.gastoList = this.firebase.list('gasto_envio', ref => ref.orderByChild('lugar'));
  }

  insertEnvio(gasto: Gasto) {
    this.gastoList.push({
      lugar: gasto.lugar,
      costo: gasto.costo
    });
  }

  updateEnvio(gasto: Gasto) {
    this.gastoList.update(gasto.$key, {
      lugar: gasto.lugar,
      costo: gasto.costo
    });
  }

  deleteEnvio($key: string) {
    this.gastoList.remove($key);
  }
}
