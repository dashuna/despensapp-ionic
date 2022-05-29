import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { TokenInterceptorService } from './interceptor/token-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule
  ],
  providers: [SplashScreen, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {    
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
