import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("userForm") productForm: NgForm;

  isShowLogin = true;
  position = ["Admin", "Cashier"];

  constructor(private networkService: NetworkService) { }

  ngOnInit(): void {
  }

  async onSubmitLogin(userForm: NgForm) {
    if (userForm.invalid) {
      return;
    }

    let user: User = {
      ...userForm.value
    }

    this.networkService.login(user).subscribe(
      result => {
        alert(result.token);
      },
      error => {
        alert('Network Failure');
      }
    );
  }

  onClickShowLogin() {
    this.isShowLogin = !this.isShowLogin;
  }

  async onSubmitRegister(userForm: NgForm) {
    if (userForm.invalid) {
      return;
    }

    let user: User = {
      ...userForm.value
    }

    this.networkService.register(user).subscribe(
      result => {
        alert('Register successfuly');
      },
      error => {
        alert('Network Failure');
      }
    );
  }
}