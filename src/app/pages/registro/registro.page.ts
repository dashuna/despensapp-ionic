import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../models/dtos';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

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
  photo = null;
    

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() { }

  createAccount() {
    this.newUser = new UserDTO(this.user, this.password, this.name, this.last_name, this.email, this.telephone, this.photo);
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

}