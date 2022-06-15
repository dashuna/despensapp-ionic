import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isLogged = true;
  userName = "usuario";
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
    } else {
      this.router.navigate(['/login']);
    }
  }

}
