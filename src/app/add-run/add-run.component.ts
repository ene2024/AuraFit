import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { Run } from '../Interfaces/run';
import { RunServiceService } from '../services/run-service.service';
import { ModalController, ToastController} from '@ionic/angular';
import { set } from 'date-fns';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';

//import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-run',
  templateUrl: './add-run.component.html',
  styleUrls: ['./add-run.component.scss'],
})
export class AddRunComponent implements OnInit {

  constructor(public runService: RunServiceService, private modalController: ModalController, private authService:AuthenticationService, private toastCtrl:ToastController,public route:Router,private photoService:PhotoService) {
  }

  ngOnInit() {

  }

  dateFromIonDatetime = format(new Date(), 'yyyy-MM-dd') + 'T00:00:00-00:00';
  initialtimevalue = set(new Date(this.dateFromIonDatetime), { hours: 0, minutes: 0, seconds: 0 });
  
  photoUrl:string | null = null;

  newRun: Run = {
    time: this.initialtimevalue.toISOString(),
    distance: 0,
    location: '',
    date: '',
    personalRate: 0,
    description: '',
    favorito: false,
    userId:this.authService.userID,
    fotoUrl:''
  };

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  time: Date = new Date();


  distanceU: number = 0;
  distanceD: number = 0;
  showDistanceInput: boolean = false;
  showTimeInput: boolean = false;
  personalRateChange: boolean = false;


  changeDistanceInput() {
    this.showDistanceInput = !this.showDistanceInput;
    this.showTimeInput = false;
  }

  changeTimeInput() {
    this.showTimeInput = !this.showTimeInput;
    this.showDistanceInput = false;
  }

  addNewRun() {
    this.newRun.date = this.dateFromIonDatetime;
    console.log(this.newRun)
    this.runService.servaddrun(this.newRun).then (async()=>{
      this.closemodal();
      const toast = await this.toastCtrl.create({
        message:"Carrera Agregada con Exito!",
        duration:2000
      })
      toast.present()
    }).catch(async(error)=>{
      const toast = await this.toastCtrl.create({
        message:error,
        duration:2000
      })
      toast.present()
    });
    
    
  }

  emptyfields(): boolean {
    if ((this.hours == 0 && this.minutes == 0 && this.seconds == 0) || (this.newRun.distance == 0 || this.newRun.location == '' || !this.personalRateChange || this.newRun.description == '')) {
      return true;
    }
    else {
      return false;
    }
  }

  closemodal() {
    this.modalController.dismiss();
  }

  ChangeDateInput(value: any) {
    this.dateFromIonDatetime = value;
  }

  onIonChangeH(event: CustomEvent) {
    this.hours = event.detail.value;
    this.formatTime(this.hours, this.minutes, this.seconds);
  }

  onIonChangeM(event: CustomEvent) {
    this.minutes = event.detail.value;
    this.formatTime(this.hours, this.minutes, this.seconds);

  }

  onIonChangeS(event: CustomEvent) {
    this.seconds = event.detail.value;
    this.formatTime(this.hours, this.minutes, this.seconds);
  }

  onIonChangeU(event: CustomEvent) {
    this.distanceU = event.detail.value;
    this.formatDistance(this.distanceU, this.distanceD);
  }

  onIonChangeD(event: CustomEvent) {
    this.distanceD = event.detail.value;
    this.formatDistance(this.distanceU, this.distanceD);
  }

  formatTime(hours: number, minutes: number, seconds: number) {
    this.time = set(new Date(this.dateFromIonDatetime), { hours: hours, minutes: minutes, seconds: seconds });
    this.newRun.time = this.time.toISOString();
  }

  formatDistance(units: number, decimals: number) {
    units = units / 1;
    this.newRun.distance = units + decimals / 10;
  }

  confirmModal() {
    this.modalController.dismiss();
    this.formatTime(this.hours, this.minutes, this.seconds);
    this.formatDistance(this.distanceU, this.distanceD);
  }

  showTime(originalTime: any): any {
    return format(parseISO(originalTime), 'HH:mm:ss');
  }


  rateChangeInput(event: any) {
    this.personalRateChange = true;
    this.newRun.personalRate = event.detail.value;
  }

  closePickers() {
    this.showTimeInput = false;
    this.showDistanceInput = false;
  }

  async takePhoto() {
    await this.photoService.addNewToGallery();
    this.photoUrl = this.photoService.foto?.webViewPath;
    this.newRun.fotoUrl=this.photoUrl
  }


}
