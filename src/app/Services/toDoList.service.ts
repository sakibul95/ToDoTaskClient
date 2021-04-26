import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SharedService } from './shared.service';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class toDoList {
    constructor(private sharedService: SharedService, private http:HttpClient, private jwtHelper:JwtHelperService) { }

  token = localStorage.getItem('jwt');

  headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.token
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  UnAuthorized(){
    alert("UnAuthorized");
  }

  getTaskLists():Observable<any>{
    if (this.isUserAuthenticated()) {
      return  this.http.get<any>(this.sharedService.APIURL+'/ToDoTasks',{headers:new HttpHeaders(this.headers)});
    } else this.UnAuthorized();
  }

  SaveTask(val:any[]){
    if (this.isUserAuthenticated()) {
      return this.http.post(this.sharedService.APIURL+'/ToDoTasks',val);
    } else this.UnAuthorized();
  }

  
}
