import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import {User} from 'firebase/auth'
import { Observable } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, query, updateDoc, where , setDoc, limit, getDocs, getDoc} from '@angular/fire/firestore';
import { Run } from '../Interfaces/run';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  actualUser:any=null;
  activeUser:boolean=false;
  userID: any
  userEmail: any
  userName: any

  constructor(public ngFireAuth: AngularFireAuth,public route: Router,public platform:Platform, private firestore: Firestore) {
   }

   async registerUser (email:string, password:string, username:string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email,password)
    .then(async (result) => {
      console.log(result.user,username)
      await this.setUserData(result.user,username);
    }).catch((error) => {
      window.alert(error.message);
    });
   }

   async setUserData(user: User, username: string) {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    try {
      await setDoc(userRef, { displayName: username }, { merge: true });
      console.log("User data set successfully");
    } catch (error) {
      console.error("Error setting user data: ", error);
    }
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
    return new Promise<User | null> ((resolve,reject) =>{
      this.ngFireAuth.onAuthStateChanged(user=>{
        if(user){
          resolve(user)
        }
        else{
          resolve(null)
        }
      },reject)
    })
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

  goToLanding(){
    if(this.activeUser==false){
      this.route.navigate(['/landing']);
    }
  }


  async getFirestoreData(): Promise<Observable<Run[]>> {
    const userID= await this.getUserID()
    const runRef = collection(this.firestore, "carreras")
    const refquery = query(runRef, where('userId', '==',userID))
    return collectionData(refquery) as Observable<Run[]>
  }

  async pushFirestoreData(nuevacarrera:Run){
    const runRef = await collection(this.firestore, "carreras")
    return addDoc(runRef, nuevacarrera)
  }

  async getUserID(): Promise<string> {
    try {
      const user = await this.getProfile();
      this.userID = user.uid;
      return this.userID;
    } catch (error) {
      console.error('Error al obtener el perfil del usuario', error);
      throw error; // Opcional: puedes manejar el error de otra manera
    }
  }

  async getUserEmail(): Promise<string> {
    try {
      const user = await this.getProfile();
      this.userEmail = user.email;
      return this.userEmail;
    } catch (error) {
      console.error('Error al obtener el Email del usuario', error);
      throw error; // Opcional: puedes manejar el error de otra manera
    }
  }

  async getUserName(userId: string): Promise<string | null> {
    try {
      const userRef = doc(this.firestore, `users/${userId}`);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData ? userData['displayName'] : null;
      } else {
        console.log('No existe');
        return null;
      }
    } catch (error) {
      console.error('No se pudo Obtener', error);
      return null;
    }
  }

  updateRun(docID:string, newRun:Run):Promise<void>{
    const runRef=doc(this.firestore,`carreras/${docID}`)
    return updateDoc(runRef,{id: newRun.id, favorito:newRun.favorito})
  }

  deleteRun(docID:string):Promise<void>{
    const runRef=doc(this.firestore,`carreras/${docID}`)
    return deleteDoc(runRef)
  }
}