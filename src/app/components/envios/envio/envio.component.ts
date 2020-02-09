import { Component, OnInit } from '@angular/core';
import { EnviosService } from 'src/app/services/envios.service';
import { NgForm } from '@angular/forms';
import { Gasto } from 'src/app/models/gasto';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css']
})
export class EnvioComponent implements OnInit {

  constructor(public enviosService: EnviosService
    // private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.enviosService.getEnvios();
    this.resetForm();
  }

  onSubmit(envioForm: NgForm) {
    if (envioForm.value.$key == null) {
      if (envioForm.value.lugar != null) {
        this.enviosService.insertEnvio(envioForm.value);
      }
    }
    else {
      this.enviosService.updateEnvio(envioForm.value);
    }
    this.resetForm(envioForm);
  }

  resetForm(envioForm?: NgForm) {
    if (envioForm != null) {
      envioForm.reset();
      this.enviosService.selectedGasto = new Gasto();
    }
  }

}
