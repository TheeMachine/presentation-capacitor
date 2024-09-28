import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.page.html',
  styleUrls: ['./second-page.page.scss'],
})
export class SecondPagePage {

  httpClient = inject(HttpClient);

  @Input()
  token = "";

  _token = localStorage.getItem("token");

  response = "";
  constructor() { 
    alert("denemem")
  }

  ionViewDidEnter() {
    this._token = "deneme local"
    setTimeout(() => {
        lastValueFrom(this.httpClient.get('http://localhost')).then((res: any) => {
          console.log(res);
          this.response = res;
        }).catch(err => {
          console.log(err);
          this.response = err;
        })
    }, 2000);
    setInterval(() => {
      this._token += "1 ";
    }, 1000)
  }

}
