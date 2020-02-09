import { Component, OnInit } from '@angular/core';
import { EnviosService } from 'src/app/services/envios.service';
import { Gasto } from 'src/app/models/gasto';

@Component({
  selector: 'app-lista-envios',
  templateUrl: './lista-envios.component.html',
  styleUrls: ['./lista-envios.component.css']
})
export class ListaEnviosComponent implements OnInit {

  envioList: Gasto[];
  
  constructor(public enviosService: EnviosService) { }

  ngOnInit() {
    this.enviosService.getEnvios()
    .snapshotChanges()
    .subscribe(item => {
      this.envioList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.envioList.push(x as Gasto);
      });
    });
  }

  onEdit(gasto: Gasto) {
    this.enviosService.selectedGasto = Object.assign({},gasto);
    // this.document.body.scrollTop = 0;
    window.scrollTo(0,0);
  }

  onDelete($key: string) {
    if(confirm('Esta seguro de eliminar?')) {
      this.enviosService.deleteEnvio($key);
    }
  }

}
