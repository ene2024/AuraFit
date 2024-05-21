import { Component, Input, OnInit, input } from '@angular/core';
import { RunServiceService } from '../services/run-service.service';
import { ActivatedRoute } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-run-details',
  templateUrl: './run-details.component.html',
  styleUrls: ['./run-details.component.scss'],
})
export class RunDetailsComponent  implements OnInit {

  @Input() id:string
  constructor(private ruta : ActivatedRoute, private consulta : RunServiceService,private authService:AuthenticationService) { }

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
