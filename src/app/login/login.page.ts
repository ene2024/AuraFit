import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Route, Router } from '@angular/router';
import { RunServiceService } from '../services/run-service.service';
import { getFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  succes: boolean = true;
  loginAtt:boolean=false; 
  loginForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService: AuthenticationService, public router: Router,private runService:RunServiceService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email :['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      password:['',[
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z]).{6,}$")
      ]]
    })
  }

  get errorControl() {
    return this.loginForm?.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.loginForm?.valid) {
      this.succes=true;
      const emailValue = this.loginForm.get('email').value;
      const passwordValue = this.loginForm.get('password').value;
      const user = await this.authService.loginUser(emailValue, passwordValue).then(() => {
        this.runService.servgetruns()
        setTimeout(()=>{
          loading.dismiss();
          this.router.navigate(['/home']);
          this.authService.activeUser=true;
        },1000);
        
      }).catch((error) => {
        console.log(error);
        loading.dismiss();
      })
    }else{
      this.loginAtt=true;
      loading.dismiss();
      console.log("Form Incorrecto")
    }
  }
}
