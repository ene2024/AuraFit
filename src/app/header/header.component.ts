import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
import { RunServiceService } from '../services/run-service.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  titulo: string = 'AuraFit'
  detalleEntrenamiento: string;
  constructor(private routeA: ActivatedRoute, private consulta: RunServiceService) { }

  ngOnInit() {

  }

  idCarrera:string
  carrera:any


  //FALTA QUE SE MANDE A LLAMAR CADA QUE CAMBIE DE VENTANA
  changeTitle() {

    this.idCarrera = this.routeA.snapshot.params['id'];
    this.carrera = this.consulta.servgetonerun(this.idCarrera);
    console.log(this.idCarrera)
    if (this.idCarrera==null) {
      this.titulo = 'AuraFit'
      console.log("Homes")
      return false
    }
    else{
      this.titulo = 'Entrenamiento en: ' + this.carrera.location
      console.log("NoHomes")
      return true
    }

  }




}
