import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { SERVER_URL } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

//const AUTH_URL = "/authenticate";
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";

  constructor(public httpClient: HttpClient) { }

  ngOnInit() { }

  onSubmit() {
    let postData = {
      "username": this.email,
      "password": this.password
    }

    this.httpClient.post(SERVER_URL + "/authenticate", postData)
      .subscribe(data => {
        console.log(data);
       }, error => {
        console.log(error);
      });
 }
}