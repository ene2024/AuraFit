import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { Run } from '../Interfaces/run';
import { RunServiceService } from '../run-service.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-run',
  templateUrl: './add-run.component.html',
  styleUrls: ['./add-run.component.scss'],
})
export class AddRunComponent  implements OnInit {

  constructor(private runService:RunServiceService, private modalController:ModalController,) {
   }
   
  ngOnInit() {}
  
  dateFromIonDatetime=format(new Date(),'yyyy-MM-dd')+'T00:00:00-00:00';
  //formattedDate=format(parseISO(this.dateFromIonDatetime), 'MMM d, yyyy, HH, mm, bbb');
  
  newRun:Run={    
    time: '',
    distance: 0,
    location: '',
    date: '',
    personalRate: '',
    description: ''};

    addNewRun(){
      this.newRun.date=this.dateFromIonDatetime;
      this.runService.servaddrun(this.newRun);
      this.modalController.dismiss();
    }

    emptyfields():boolean{
      if(this.newRun.time==''||this.newRun.distance==0||this.newRun.location==''||this.newRun.personalRate==''||this.newRun.description==''){
        return true;
      }
      else{
        return false;
      }
    }

    closemodal(){
      this.modalController.dismiss();
    }

  datechanged(value:any){
    this.dateFromIonDatetime=value;
  }

}
