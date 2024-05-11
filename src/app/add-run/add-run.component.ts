import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { Run } from '../Interfaces/run';
import { RunServiceService } from '../run-service.service';
import { ModalController, RangeChangeEventDetail } from '@ionic/angular';
import { set } from 'date-fns';
import { RangeCustomEvent } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
//import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-run',
  templateUrl: './add-run.component.html',
  styleUrls: ['./add-run.component.scss'],
})
export class AddRunComponent implements OnInit {

  constructor(public runService: RunServiceService, private modalController: ModalController,public authServ:AuthenticationService,public routes:Router) {
  }

  ngOnInit() {
    if(this.authServ.activeUser==false){
      this.routes.navigate(['/landing']);
    }
    
   }

  dateFromIonDatetime = format(new Date(), 'yyyy-MM-dd') + 'T00:00:00-00:00';
  initialtimevalue = set(new Date(this.dateFromIonDatetime), { hours: 0, minutes: 0, seconds: 0 });

  //formattedDate=format(parseISO(this.dateFromIonDatetime), 'MMM d, yyyy, HH, mm, bbb');

  newRun: Run = {
    time: this.initialtimevalue.toISOString(),
    distance: 0,
    location: '',
    date: '',
    personalRate: 0,
    description: '',
    favorito: false
  };

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  time: Date = new Date();


  distanceU: number = 0;
  distanceD: number = 0;
  showDistanceInput:boolean=false;
  showTimeInput:boolean=false;
  personalRateChange:boolean=false;


  changeDistanceInput(){
    this.showDistanceInput=!this.showDistanceInput;
    this.showTimeInput=false;
  }

  changeTimeInput(){
    this.showTimeInput=!this.showTimeInput;
    this.showDistanceInput=false;
  }

  addNewRun() {
    this.newRun.date = this.dateFromIonDatetime;
    this.runService.servaddrun(this.newRun);
    this.modalController.dismiss();
    console.log(this.newRun);
  }

  emptyfields(): boolean {
    if ((this.hours == 0 && this.minutes == 0 && this.seconds == 0) || (this.newRun.distance == 0 || this.newRun.location == '' || !this.personalRateChange|| this.newRun.description == '')) {
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
    this.formatTime(this.hours,this.minutes,this.seconds);
  }

  onIonChangeM(event: CustomEvent) {
    this.minutes = event.detail.value;
    this.formatTime(this.hours,this.minutes,this.seconds);

  }

  onIonChangeS(event: CustomEvent) {
    this.seconds = event.detail.value;
    this.formatTime(this.hours,this.minutes,this.seconds);
  }

  onIonChangeU(event: CustomEvent) {
    this.distanceU = event.detail.value;
    this.formatDistance(this.distanceU,this.distanceD);
  }

  onIonChangeD(event: CustomEvent) {
    this.distanceD = event.detail.value;
    this.formatDistance(this.distanceU,this.distanceD);
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

  cancelModal() {
    this.modalController.dismiss();

  }

  showTime(originalTime: any): any {
    return format(parseISO(originalTime), 'HH:mm:ss');
  }


  rateChangeInput(event:any) {
    this.personalRateChange=true;
    this.newRun.personalRate = event.detail.value;
  }

  closePickers(){
    this.showTimeInput=false;
    this.showDistanceInput=false;
  }








}
