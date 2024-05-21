import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Run } from '../Interfaces/run';
import { RunServiceService } from '../services/run-service.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent  implements OnInit {

  constructor(public authService: AuthenticationService, public route:Router, private runService: RunServiceService, private routeA:ActivatedRoute) { }

  ngOnInit() {
    this.authService.goToLanding();
    this.runService.servgetruns();
    this.routeA.params.subscribe(params => {
      this.carreras=this.runService.carreras
      console.log(this.carreras)
    });
  }
  carreras : Run[] = this.runService.carreras;
  
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
