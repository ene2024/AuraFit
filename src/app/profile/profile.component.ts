import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {
  user:any;
  email:any;
  constructor(public authService:AuthenticationService,public route:Router) {
  }
  
  ngOnInit() {
    this.user=this.authService.getProfile();
    this.authService.getEmail()
      .then(email => {
        this.email = email;
      })
      .catch(error => {
        console.error("Error al obtener el email del usuario:", error);
      });
      console.log(this.email);
  }

  async logout(){
    this.authService.signOut().then(()=>{
      this.route.navigate(['/landing']);
      this.authService.activeUser=false;
    }).catch((error)=>{
      console.log(error);
    })
  }
}