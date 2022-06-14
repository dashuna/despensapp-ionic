import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { SERVER_URL } from '../../../environments/environment';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { JwtDto } from '../../models/jwt-dto';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

//const AUTH_URL = "/authenticate";
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";

  signform:any;
  avatarimage: any;

  constructor(
    public httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router
    ) { }

  ngOnInit() { 
    this.signform = "login"
    this.avatarimage = 'assets/images/avatar.png';
  }

  onSubmit() {
    let postData = {
      "username": this.email,
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
}