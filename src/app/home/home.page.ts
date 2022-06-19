import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isLogged = true;
  userName = "";
  public home: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router
    ) {}

  // ngOnInit() {  //-> se ejecuta solo una vez y lo que necesitamos es un ciclo de vida
  //     this.home = this.activatedRoute.snapshot.paramMap.get('id');
  //     // this.testLogged(); 
  //   }

  ionViewWillEnter() {
    this.comprobarLogin();
  }

  comprobarLogin() {
    if (this.tokenService.isLogged()) {
      //this.router.navigate(['/inventario']);
      this.userName = this.tokenService.getUserName();
      document.getElementById("tab-button-inventario").click();
    } else {
      this.router.navigate(['/login']);
    }
  }

  logOut() {
    console.log("entra");
    this.tokenService.logOut();
    this.isLogged = false;
    this.router.navigate(['/login']);
  }

}
