import { Component, OnInit, Input } from '@angular/core';
import { AddRunComponent } from '../add-run/add-run.component';
import { ModalController } from '@ionic/angular';
import { Run } from '../Interfaces/run';
import { RunServiceService } from '../run-service.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalCtrl: ModalController, private servicio : RunServiceService) {}

  carreraNueva: Run ={
    time: '',
    distance: 0,
    location: '',
    date: '',
    personalRate: '',
    description: ''
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

  formatDate(originalDate: any):any{
    return format(parseISO(originalDate), 'MMM d, yyyy, HH:mm, bbb');
  }

  formatTime(originalTime: any):any{
    return format(parseISO(originalTime), 'HH:mm:ss');
  }
}


