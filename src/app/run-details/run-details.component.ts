import { Component, Input, OnInit } from '@angular/core';
import { RunServiceService } from '../services/run-service.service';
import { ActivatedRoute } from '@angular/router';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-run-details',
  templateUrl: './run-details.component.html',
  styleUrls: ['./run-details.component.scss'],
})
export class RunDetailsComponent  implements OnInit {

  constructor(private ruta : ActivatedRoute, private consulta : RunServiceService) { }

  ngOnInit() {
  }

  idCarrera: string = this.ruta.snapshot.params['id'];

  carrera = this.consulta.servgetonerun(this.idCarrera);

  formatDate(originalDate: any):any{
    return format(parseISO(originalDate), 'MMM d, yyyy, HH:mm bbb');
  }

  formatTime(originalTime: any):any{
    return format(parseISO(originalTime), 'HH:mm:ss');
  }

}
