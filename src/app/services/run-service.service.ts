import { Injectable } from '@angular/core';
import { Run } from '../Interfaces/run';
import { AuthenticationService } from './authentication.service';
import { Firestore, addDoc, collection, collectionData, query, where } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RunServiceService {

  carreras: Run[] = [];
  units: string[] = ['Km', 'Mi']

  //Variables de la BD
  userID: any
  userEmail: any

  constructor(private authService: AuthenticationService, private firestore: Firestore,private toastCtr: ToastController, public router: Router) {
  }

  async servaddrun(nuevacarrera: Run) {
    this.carreras.push(nuevacarrera);
    const runID=await this.authService.pushFirestoreData(nuevacarrera)
    nuevacarrera.id=runID.id
    this.authService.updateRun(runID.id,nuevacarrera)
  }

  async servgetruns(){
    (await this.authService.getFirestoreData()).subscribe(res =>{
      this.carreras=res
    });
  }

  servgetonerun(id: any) {
    return this.carreras[id];
  }

  servedeleterun(id: number) {
    this.carreras.splice(id, 1);
    this.authService.deleteRun(this.carreras[id].id)
    
  }

  servfavrun(id: number) {
    this.carreras[id].favorito = true;
    this.authService.updateRun(this.carreras[id].id,this.carreras[id])
  }

  servnotfavrun(id: number) {
    this.carreras[id].favorito = false;
    this.authService.updateRun(this.carreras[id].id,this.carreras[id])
  }

}
