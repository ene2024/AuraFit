import { Injectable } from '@angular/core';
import { Foto } from '../Interfaces/foto';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public foto: Foto;
  constructor() { }
  public async addNewToGallery() {    

    // Toma Foto    
    
    const capturedPhoto = await Camera.getPhoto({      
    resultType: CameraResultType.Uri,      
    source: CameraSource.Camera,
    quality: 100 ,
    
    });
    this.foto={
      filepath:'',
      webViewPath: capturedPhoto.webPath
    }
  }
}
