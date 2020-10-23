import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() myToggle = new  EventEmitter(); //toggle #sidenav

  mailCount = 99;
  notiCount = 25;
  //name = this.authService.getUserInfo;
  image = 'https://material.angular.io/assets/img/examples/shiba1.jpg';

  constructor(
    public authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

  onClickLogout() {
    this.authService.clearToken();
    localStorage.removeItem('name');
    this.router.navigate(['login']);
  }

  onClickToggle() {
    this.myToggle.emit() //send toggle
  }
}
