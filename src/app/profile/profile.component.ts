import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  photoUrl:string | null = null;
  constructor(public authService: AuthenticationService, public route: Router, public platform: Platform,public photoService:PhotoService) {
  }
  ngOnInit() {
    this.authService.getUserID();
    this.authService.getUserEmail();
    this.authService.getUserName(this.authService.userID)
      .then(userName => {
        this.authService.userName=userName
      })
      .catch(error => {
        console.error('Error getting user name:', error);
      });
  }

  async logout() {
    this.authService.signOut().then(() => {
      this.authService.restartApp();

    }).catch((error) => {
      console.log(error);
    })
    this.route.navigate(['/landing']);

  }

  async takePhoto() {
    await this.photoService.addNewToGallery();
    this.photoUrl = this.photoService.foto?.webViewPath;
    console.log(this.photoUrl)
  }

}