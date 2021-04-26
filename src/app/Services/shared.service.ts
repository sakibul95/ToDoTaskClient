import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  
  readonly APIURL = "https://localhost:5001/api";
  postLoginData:any;

  constructor(private http:HttpClient) { }

  getPostLoginData(User_id:any,pass:any):Observable<any[]>{
    return  this.http.get<any>(this.APIURL+'/login/'+User_id+'/'+pass);
  }

  // getTaskLists():Observable<any[]>{
  //   return  this.http.get<any>(this.APIURL+'/ToDoTasks');
  // }

  
}
