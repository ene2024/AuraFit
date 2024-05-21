import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { RunDetailsComponent } from './run-details/run-details.component';
import { SummaryComponent } from './summary/summary.component';
import { AddRunComponent } from './add-run/add-run.component';
import { FormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire/compat'
import{AngularFireAuthModule} from '@angular/fire/compat/auth'
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './header/header.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import{getFirestore, provideFirestore} from '@angular/fire/firestore'
@NgModule({
  declarations: [AppComponent,FavoritesComponent,ProfileComponent,RunDetailsComponent,SummaryComponent, AddRunComponent,HeaderComponent,FooterMenuComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,
    AngularFireModule,AngularFireAuthModule,AngularFireModule.initializeApp(environment.firebaseConfig),
  provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
  provideFirestore(()=>getFirestore())
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
