import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {
  user:any;
  email:any;
  constructor(public authService:AuthenticationService,public route:Router,public platform:Platform) {
  }
  
  ngOnInit() {
    if(this.authService.activeUser==false){
      this.route.navigate(['/landing']);
    }
    this.user=this.authService.getProfile();
    console.log(this.user)
    this.authService.getEmail()
      .then(email => {
        this.email = email;
        console.log(this.email);
      })
      .catch(error => {
        console.error("Error al obtener el email del usuario:", error);
      });
  }

  async logout(){
    this.authService.signOut().then(()=>{
      this.authService.restartApp();
      
    }).catch((error)=>{
      console.log(error);
    })
    this.route.navigate(['/landing']);
    
  }

}