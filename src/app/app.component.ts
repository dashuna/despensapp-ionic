import { Component, ViewChild } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(MenuComponent) menu: MenuComponent;
  // para acceder a los metodos del menu component
  menuOpen = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private menuController: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
    })
  }

  toogleMenu(): void {
    // this.menu.testLogged();
    this.menuController.toggle();
  }

  changeMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
