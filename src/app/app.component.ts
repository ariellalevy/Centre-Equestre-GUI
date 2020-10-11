import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Centre-Equestre-GUI';
  isLogin:boolean=false

  post(item) {
    console.log(item);
    this.isLogin = true
  }
}
