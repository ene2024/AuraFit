import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app'
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  emailUsuario: string | null = null;
  activeUser:boolean=false;

  constructor(public ngFireAuth: AngularFireAuth) {
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
    return await this.ngFireAuth.signOut();
   }

   async getProfile(){
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
}
