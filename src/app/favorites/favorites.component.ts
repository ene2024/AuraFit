import { Component, OnInit } from '@angular/core';
import { Run } from '../Interfaces/run';
import { RunServiceService } from '../run-service.service';
import { format, parseISO } from 'date-fns';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent  implements OnInit {  

  constructor(private servicio : RunServiceService) { }

  ngOnInit() {
    this.servicio.servgetruns();
  }

  carreras : Run[] = this.servicio.carreras;

  formatDate(originalDate: any):any{
    return format(parseISO(originalDate), 'MMM d, yyyy, HH:mm bbb');
  }

  formatTime(originalTime: any):any{
    return format(parseISO(originalTime), 'HH:mm:ss');
  }

  notfavcarrera(id: number){
    this.servicio.servnotfavrun(id);
  }
}
