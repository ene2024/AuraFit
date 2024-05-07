import { Component, OnInit, Input } from '@angular/core';
import { AddRunComponent } from '../add-run/add-run.component';
import { ModalController } from '@ionic/angular';
import { Run } from '../run';
import { RunServiceService } from '../run-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalCtrl: ModalController, private servicio : RunServiceService) {}

  carreraNueva: Run ={
    tiempo: '',
    distancia: '',
    ubicacion: '',
    fecha: '',
    puntuacion: '',
    notas: ''
  }

  ngOnInit () {
    this.servicio.servgetruns();
  }

  carreras : Run[] = this.servicio.carreras;

  eliminarcarrera(id: number){
    this.servicio.servedeleterun(id);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddRunComponent,
    });
    return await modal.present();
  }
}
