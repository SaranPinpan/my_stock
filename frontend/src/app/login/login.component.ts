import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
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
  imageSrc: string | ArrayBuffer;
  file: File;

  constructor(
    private networkService: NetworkService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(["stock"]);
    }
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
        if (result.token) {
          this.authService.setToken(result.token, result.id);
          this.router.navigate(["stock"]);
        } else {
          alert('Token Invalid');
        }
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
      ...userForm.value,
      image: this.file
    }

    this.networkService.register(user).subscribe(
      result => {
        this.isShowLogin = true;
        alert('Register successfuly');
      },
      error => {
        alert('Network Failure');
      }
    );
  }

  onUploadImage(event) {
    const metaImage = event.target.files[0];
    if (metaImage) {
      this.file = metaImage; //this.file uses for upload image to the server
      const reader = new FileReader(); //preview image
      reader.readAsDataURL(metaImage);
      reader.onload = () => {
        this.imageSrc = reader.result;
      }
    }
  }
}