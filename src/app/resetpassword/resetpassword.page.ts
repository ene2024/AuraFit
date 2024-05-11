import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  email:any='';
  resetAtt:boolean=false;
  constructor(public authService:AuthenticationService, public route:Router, public alertController:AlertController) { }

  ngOnInit(
  ) {
    this.resetAtt=false;
  }

  async resetPassword(){
    console.log(this.email);
    this.authService.resetPassword(this.email).then(()=>{
      this.mostrarAlerta();
      this.route.navigate(['/login']);
      console.log("Link enviado");
  }
  ).catch((error) => {
      console.log(error);
      this.resetAtt=true;
    })
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Link Enviado',
      message: 'El link para restableciemiento se ha enviado a: '+this.email,
      buttons: ['OK']
    });
    await alert.present();
  }
}