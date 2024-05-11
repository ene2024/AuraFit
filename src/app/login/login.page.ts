import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  succes: boolean = true;
  loginAtt:boolean=false; 
  loginForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService: AuthenticationService, public router: Router) { }

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
      }).catch((error) => {
        console.log(error);
        this.succes = false;
        loading.dismiss();
      })

      if (this.succes) {
        loading.dismiss();
        this.router.navigate(['/home']);
        console.log('Login Correcto');
        this.authService.activeUser=true;
      } else {
        loading.dismiss();
        console.log('Credenciales Incorrectas');
      }
    }else{
      this.loginAtt=true;
      loading.dismiss();
      console.log("Form Incorrecto")
    }
  }
}
