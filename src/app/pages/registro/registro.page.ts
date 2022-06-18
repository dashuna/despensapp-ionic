import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../models/dtos';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  newUser: UserDTO;

  user = "";
  password = "";
  name = "";
  last_name = "";
  email = "";
  telephone = "";

  selectedImage: any;
  userImg: any = '';


  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.userImg = 'assets/images/no-product.jpg';
  }

  ngOnInit() { }

  createAccount() {
    this.newUser = new UserDTO(this.user, this.password, this.name, this.last_name, this.email, this.telephone,
      this.cleanBase64(this.selectedImage.webPath));
    this.authService.register(this.newUser).subscribe(
      data => {
        this.presentToast("El usuario se ha creado");
        this.authService.login(this.newUser.user, this.newUser.password)
        .subscribe(data => {
          this.tokenService.setToken(data.token);
          this.router.navigate(['/']);
         }, error => {
          console.log(error);
        });
      },
      err => {
        this.presentToast(err.error.mensaje);
      }
    )

}

async presentToast(mensaje: string) {
  const toast = await this.toastController.create({
    message: "El usuario NO se ha creado",
    duration: 2000,
    position: 'bottom'
  });
  toast.present();
}



checkPlatformForWeb() {
  return (Capacitor.getPlatform() === 'web' || Capacitor.getPlatform() === 'ios');
}

async getPicture() {
  const image = await Camera.getPhoto({
    quality: 90,
    source: CameraSource.Prompt,
    width: 600,
    resultType: this.checkPlatformForWeb() ? CameraResultType.DataUrl : CameraResultType.Uri
  });
  console.log('image: ', image);
  this.userImg = image.dataUrl;
  this.selectedImage = image;
  if (this.checkPlatformForWeb()) {
   this.selectedImage.webPath = image.dataUrl;
  }
}

cleanBase64(base64: string): string {
  return base64.split(',')[1];
}

}
