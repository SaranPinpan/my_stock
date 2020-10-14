import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: String = 'Saran';
  tel = '1150';
  role = ['admin', 'it', 'hr'];
  age: number = 26;
  isShowInfo = true;

  onClickDemo() {
    this.isShowInfo = !this.isShowInfo;
  }
}
