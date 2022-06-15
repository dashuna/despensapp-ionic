import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges, OnInit {

  @Input() title: string;
  @Input() backLink: string;

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      // console.log(event);
      // if (event && event instanceof NavigationEnd && event.url) {
      //   //this.backLink = event.url.replace('/profile', '');
      //   // this.backLink = "/inventario";
      //   console.log("buscame",this.backLink);
      //   this.
      // }
    });
  }

  ngOnInit(): void {
    
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
    console.log(changes); // here you will get the data from parent once the input param is change
  }   
  

}
