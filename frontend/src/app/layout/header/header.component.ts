import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() myToggle = new  EventEmitter(); //toggle #sidenav

  mailCount = 99;
  notiCount = 25;
  // name = 'Test';
  // image = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  name = '';
  image = '';

  constructor(
    private networkService: NetworkService,
    public authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getUserInfo(Number(localStorage.getItem('id')))
  }

  onClickLogout() {
    this.authService.clearToken();
    this.router.navigate(['login']);
  }

  onClickToggle() {
    this.myToggle.emit() //send toggle
  }

  getUserInfo(id: number) {
    this.networkService.getUserInfo(id).subscribe(
      result => {
        this.name = result.username
        this.image = this.networkService.getUserImage(result.image)
      },
      error => {
        alert('Network Failure');
      }
    );
  }
}
