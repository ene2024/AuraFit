import { Component, OnInit } from '@angular/core';
import { Run } from '../Interfaces/run';
import { RunServiceService } from '../services/run-service.service';
import { format, parseISO } from 'date-fns';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent  implements OnInit {  

  constructor(private runService : RunServiceService,public authService:AuthenticationService,public route:Router,private routeA:ActivatedRoute) {
  }

  ngOnInit() {
    this.authService.goToLanding();
    this.runService.servgetruns();

    this.routeA.params.subscribe(params => {
      this.carreras=this.runService.carreras
    });

   }


  carreras : Run[] = this.runService.carreras;

  formatDate(originalDate: any):any{
    return format(parseISO(originalDate), 'MMM d, yyyy, HH:mm aaa');
  }

  formatTime(originalTime: any):any{
    return format(parseISO(originalTime), 'HH:mm:ss');
  }

  notfavcarrera(id: number){
    this.runService.servnotfavrun(id);
  }
}
