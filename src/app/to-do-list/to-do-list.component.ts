import { Component, OnInit } from '@angular/core';
import { SharedService } from '../Services/shared.service';
import { toDoList } from '../Services/toDoList.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface IToDoTask {
  ID?: any;     
  SLNo?: Number;      
  Task?: string;  
  IsComplete?: Number;
}

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  constructor(private service:SharedService, private toDoListService:toDoList,
     private router:Router, private jwtHelper:JwtHelperService,private modalService: NgbModal) { }

  roleChecking = this.service.postLoginData;
  taskName : any= "";
  ItemsList: any[];

  ngOnInit(): void {
    this.GetTaskLists();
  }

  AddTaskToList(){
    if (typeof this.taskName != "undefined" && this.taskName != "") {
      var task : IToDoTask={};
      var max = Math.max(...this.ItemsList.map(({ SLNo }) => SLNo),0);
      task.SLNo = max + 1;
      task.Task = this.taskName;
      task.IsComplete = 0;
      this.ItemsList.push(task);
      // For clearing task field
      this.taskName = "";
    } else {
      alert("Task Name can not be empty.");
    }
  }

  deleteItem(dataItem){
    if (this.roleChecking != null && this.roleChecking.role == "Admin") {
      var index = this.ItemsList.indexOf(dataItem);
      if (index>=0) {
        this.ItemsList.splice(index,1);
      }
    } else {
      alert("You are not allowed.");
    }
  }

  SaveTasks(IsLOG){
    this.toDoListService.SaveTask(this.ItemsList).subscribe(res=>{
      if (typeof IsLOG == "undefined" || IsLOG == "") {
        alert("Tasks saved successfully.");
        this.GetTaskLists();
      } else if (IsLOG == "ForDelete") {
        this.GetTaskLists();
      }
    });
  }

  DeleteTasks(){
    if (this.roleChecking != null && this.roleChecking.role == "Admin") {
      if (confirm("Are you sure, you want to delete all tasks?")) {
        this.ItemsList=[];
        this.SaveTasks("ForDelete");
        alert("Tasks deleted successfully.");
      }
    } else {
      alert("You are not allowed.");
    }
  }

  UpdatingCheckBox(dataItem){
    if (dataItem.IsComplete) {
      dataItem.IsComplete = 1;
    }else {
      dataItem.IsComplete = 0;
    }
  }

  async GetTaskLists(){
    var result = await this.toDoListService.getTaskLists().toPromise().then((data:any)=>{
      console.log(data);
      this.ItemsList = data;
    });
  }

   logOut() {
     if (confirm("Do you want to automatically save the unsaved works before logout?")) {
      this.SaveTasks("UnsavedTasks");
      localStorage.removeItem("jwt");
      this.router.navigate(['login']);
     } else {
      localStorage.removeItem("jwt");
      this.router.navigate(['login']);
     }
    
  }
  

}
