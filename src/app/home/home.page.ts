import { Component, OnInit, Input } from '@angular/core';
import { AddRunComponent } from '../add-run/add-run.component';
import { ModalController } from '@ionic/angular';
import { Run } from '../Interfaces/run';
import { RunServiceService } from '../run-service.service';
import { format, parseISO } from 'date-fns';
import { ActionSheetController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private modalCtrl: ModalController, private servicio : RunServiceService, public authService:AuthenticationService,public route:Router) {
  }

  ngOnInit() {
    if(this.authService.activeUser==false){
      this.route.navigate(['/landing']);
    }
    this.servicio.servgetruns();
   }

  carreraNueva: Run ={
    time: '',
    distance: 0,
    location: '',
    date: '',
    personalRate: 0,
    description: '',
    favorito: false
  }

  carreras : Run[] = this.servicio.carreras;

  eliminarcarrera(id: number){
    this.servicio.servedeleterun(id);
  }

  favcarrera(id: number){
    this.servicio.servfavrun(id);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddRunComponent,
    });
    return await modal.present();
  }

  formatDate(originalDate: any):any{
    return format(parseISO(originalDate), 'MMM d, yyyy, HH:mm bbb');
  }

  formatTime(originalTime: any):any{
    return format(parseISO(originalTime), 'HH:mm:ss');
  }

  isActionSheetOpen = false;
  public actionSheetButtons = [
    {
      text: 'Eliminar',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }
}


