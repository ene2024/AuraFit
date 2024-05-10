import { Injectable } from '@angular/core';
import { Run } from './Interfaces/run';

@Injectable({
  providedIn: 'root'
})
export class RunServiceService {

  carreras: Run []=[];
  units: string[]=['Km','Mi']

  constructor() { }

  servaddrun(nuevacarrera: Run){
    this.carreras.push(nuevacarrera);
  }

  servgetruns(){
    return this.carreras;
  }

  servgetonerun(id: any){
    return this.carreras[id];
  }

  servedeleterun(id: number){
    this.carreras.splice(id,1);
  }
}
