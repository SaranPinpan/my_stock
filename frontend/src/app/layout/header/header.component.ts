import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() myToggle = new  EventEmitter(); //toggle #sidenav

  mailCount = 99;
  notiCount = 25;
  name = 'Saran';
  image = 'https://material.angular.io/assets/img/examples/shiba1.jpg';

  constructor() { }

  ngOnInit(): void {
  }

  onClickLogout() {
    alert('Logout!');
  }

  onClickToggle() {
    this.myToggle.emit() //sent toggle
  }
}
