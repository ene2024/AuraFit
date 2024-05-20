import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Run } from '../Interfaces/run';
import { RunServiceService } from '../run-service.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent  implements OnInit {

  constructor(public authService: AuthenticationService, public route:Router, private servicio: RunServiceService) { }

  ngOnInit() {
    if(this.authService.activeUser==false){
      this.route.navigate(['/landing']);
    }
  }

  carreras : Run[] = this.servicio.carreras;
  x: any;

  elegir(i: number): string{
    this.x = this.carreras[i].distance;
    if (this.x<=2){
      console.log("int1");
      return 'light';
    }
    else if (this.x>2 && this.x<=5){
      console.log("int2");
      return 'warning';
    }
    else if (this.x>5 && this.x<=10){
      console.log("int3");
      return 'tertiary';
    }
    else if (this.x>10){
      console.log("int4");
      return 'success';
    }
    console.log("noentró");
    return 'warning';
  } 
}
