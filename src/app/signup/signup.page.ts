import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regAtt:boolean=false;
  regForm: FormGroup;
  succes: boolean = true;
  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z]).{6,}$")
      ]]
    })
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.regForm?.valid) {
      this.succes=true;
      const emailValue = this.regForm.get('email').value;
      const passwordValue = this.regForm.get('password').value;
      const userValue = this.regForm.get('fullname').value;
      const user = await this.authService.registerUser(emailValue, passwordValue,userValue).then(() => {
      }).catch((error) => {
        console.log(error);
        this.succes = false;
        loading.dismiss();
      })

      if (this.succes) {
        loading.dismiss();
        this.router.navigate(['/home']);
        console.log('Registro Correcto');
        this.authService.activeUser=true;
      } else {
        loading.dismiss();
        console.log('Credenciales Incorrectas');
      }
    }else {
      this.regAtt=true;
      console.log("form no Valido")
      loading.dismiss();
    }
  }
}
