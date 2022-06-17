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
    ) { }

  ngOnInit() { 
    this.signform = "login"
    this.avatarimage = 'assets/images/avatar.png';

    this.registerForm = this.buildRegisterForm();
  }

  onSubmit() {
    let postData = {
      "username": this.username,
      "password": this.password
    }

    this.httpClient.post<JwtDto>(SERVER_URL + "/authenticate", postData)
      .subscribe(data => {
        this.tokenService.setToken(data.token);
        this.router.navigate(['/']);
       }, error => {
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
      ],
      photo: ['', Validators.required]
    }
  );
 }

 createAccount() {
  this.submitted = true;
  console.log(this.registerForm.value.username);

  if (this.registerForm.invalid) {
    return;
  }

  this.newUser = new UserDTO(this.registerForm.value.username, this.registerForm.value.password, this.registerForm.value.name, this.registerForm.value.last_name, this.registerForm.value.email, this.registerForm.value.telephone, this.registerForm.value.photo);
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
}