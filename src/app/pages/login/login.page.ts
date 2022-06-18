import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { SERVER_URL } from '../../../environments/environment';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { JwtDto } from '../../models/jwt-dto';
import { UserDTO } from '../../models/dtos';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

//const AUTH_URL = "/authenticate";
export class LoginPage implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  username: string = "";
  password: string = "";

  signform:any;
  avatarimage: any;

  newUser: UserDTO;

  selectedImage: any;
  userImg: any = '';

  // name = "";
  // last_name = "";
  // email = "";
  // telephone = "";
  // photo = null;

  constructor(
    public httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private formBuilder: FormBuilder
    ) {
      this.userImg = 'assets/images/no-product.jpg';
    }

  ngOnInit() {
    this.signform = "login";
    this.avatarimage = 'assets/images/avatar.png';

    this.registerForm = this.buildRegisterForm();
  }

  ionViewWillEnter() {
    this.username = "";
    this.password = "";
    
  }

  onSubmit() {
    let postData = {
      "username": this.username,
      "password": this.password
    };

    this.httpClient.post<JwtDto>(SERVER_URL + "/authenticate", postData)
      .subscribe(data => {
        this.tokenService.setToken(data.token);
        this.router.navigate(['/']);
       }, error => {
        this.presentToast("El usuario o la contraseña son incorrectos.")
        console.log(error);
      });
 }

 buildRegisterForm(): FormGroup {
  return this.formBuilder.group(
    {
      username: ['', Validators.required],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['',
        [Validators.required, Validators.minLength(9),]
      ]
    }
  );
 }

 createAccount() {
  this.submitted = true;
  console.log(this.registerForm.value.username);

  if (this.registerForm.invalid) {
    return;
  }

  this.newUser = new UserDTO(this.registerForm.value.username, this.registerForm.value.password,
     this.registerForm.value.name, this.registerForm.value.last_name, this.registerForm.value.email,
     this.registerForm.value.telephone, this.cleanBase64(this.selectedImage.webPath));
  this.authService.register(this.newUser).subscribe(
    data => {
      this.presentToast("El usuario se ha creado con éxito.");
      this.authService.login(this.newUser.user, this.newUser.password).subscribe(
        data => {
          this.tokenService.setToken(data.token);
          this.router.navigate(['/']);
        },
        error => {
          this.presentToast("El usuario NO se ha creado.");
          console.log(error);
      });
    },
    err => {
      this.presentToast("El usuario NO se ha creado.");
    }
  )

}

async presentToast(mensaje: string) {
const toast = await this.toastController.create({
  message: mensaje,
  duration: 2000,
  position: 'bottom'
});
toast.present();
}

get f(): { [key: string]: AbstractControl } {
  return this.registerForm.controls;
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
