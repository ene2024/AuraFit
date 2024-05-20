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
  
  runScore(i: number): string{
    if (i<=2){
      return 'light';
    }
    else if (i>2 && i<=5){
      return 'warning';
    }
    else if (i>5 && i<=10){
      return 'tertiary';
    }
    else if (i>10){
      return 'success';
    }
    return 'warning';
  } 
}
