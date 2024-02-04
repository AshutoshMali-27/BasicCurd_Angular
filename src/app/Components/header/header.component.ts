import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
@Output() sidenavtoggled =new EventEmitter<boolean>();
menuStatus:boolean=false;

  constructor() { }



  ngOnInit(): void {
      
  }

  sidenavtoggle() {
    this.menuStatus=!this.menuStatus;
    this.sidenavtoggled.emit(this.menuStatus);
  }
}
