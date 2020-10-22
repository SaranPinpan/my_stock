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
  name = 'Saran';
  image = 'https://material.angular.io/assets/img/examples/shiba1.jpg';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClickLogout() {
    this.authService.clearToken();
    this.router.navigate(['login']);
  }

  onClickToggle() {
    this.myToggle.emit() //send toggle
  }
}
