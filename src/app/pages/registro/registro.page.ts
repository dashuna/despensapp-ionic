import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  name: string = "";
  email: string = "";
  password: string = "";
  confirm_password: string = "";  

  constructor() { }

  ngOnInit() { }

  onSubmit() {
     alert(
      this.name + ', ' + this.email + ', ' + this.password + ', ' + this.confirm_password
     )
  }


}
