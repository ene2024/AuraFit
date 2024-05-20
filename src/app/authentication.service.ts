import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  emailUsuario: string | null = null;
  actualUser:any=null;
  activeUser:boolean=true;

  constructor(public ngFireAuth: AngularFireAuth,public route: Router,public platform:Platform) {
   }

   async registerUser (email:string, password:string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email,password);
   }

   async loginUser (email:string, password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email,password);
   }

   async resetPassword(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email);
   }

   async signOut(){
    this.actualUser=await this.ngFireAuth.signOut();
    return this.actualUser;
   }

   async getProfile(){
    this.actualUser=await this.ngFireAuth.currentUser;
    console.log(this.actualUser);
    return await this.ngFireAuth.currentUser;
   }

   getEmail(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.ngFireAuth.currentUser
        .then(usuario => {
          if (usuario) {
            resolve(usuario.email); // Resuelve el email del usuario
          } else {
            resolve(null); // No hay usuario autenticado
          }
        })
        .catch(error => {
          reject(error); // Manejo de errores
        });
    });
  }

  restartApp() {
    // Verifica si la aplicación se está ejecutando en un dispositivo móvil
    if (this.platform.is('cordova')) {
      // Si está en un dispositivo móvil, utiliza el plugin de Ionic para reiniciar la aplicación
      this.platform.ready().then(() => {
        window.location.reload();
      });
    } else {
      // Si no está en un dispositivo móvil, simplemente recarga la página
      window.location.reload();
    }
  }

}
