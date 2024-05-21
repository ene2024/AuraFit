import { Component} from '@angular/core';
import { AddRunComponent } from '../add-run/add-run.component';
import { ModalController } from '@ionic/angular';
import { Run } from '../Interfaces/run';
import { RunServiceService } from '../services/run-service.service';
import { format, parseISO } from 'date-fns';
import { ActionSheetController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  constructor(private modalCtrl: ModalController, public authService: AuthenticationService, public route: Router,public runService:RunServiceService,private routeA:ActivatedRoute) {
  }

  ngOnInit() {
    this.authService.goToLanding();
    this.runService.servgetruns();

    this.routeA.params.subscribe(params => {
      this.carreras=this.runService.carreras
    });

  }

  carreras: Run[] = this.runService.carreras;
  
  eliminarcarrera(id: number) {
    this.runService.servedeleterun(id);
  }

  favcarrera(id: number) {
    this.runService.servfavrun(id);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddRunComponent,
    });
    return await modal.present();
  }

  formatDate(originalDate: any): any {
    return format(parseISO(originalDate), 'MMM d, yyyy, hh:mm aaa');
  }

  formatTime(originalTime: any): any {
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


