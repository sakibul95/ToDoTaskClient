import { Component, OnInit } from '@angular/core';
import { SharedService } from '../Services/shared.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:SharedService, private jwtHelper:JwtHelperService, private router:Router) { }

  User_id:any;
  pass:any;
  postLoginData:any;

  ngOnInit(): void {

  }

  async LoginClick(){
    var result = await this.service.getPostLoginData(this.User_id,this.pass).toPromise().then((data:any)=>{
      this.postLoginData = data;
      this.service.postLoginData = data;
      localStorage.setItem("jwt", this.postLoginData.token);
      if (this.postLoginData.token && !this.jwtHelper.isTokenExpired(this.postLoginData.token)) {
        this.router.navigate(['toDoList']);
      }
      else {
        this.router.navigate(['login']);
      }
    });
  }
  

}
