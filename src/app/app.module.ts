import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedService } from "./Services/shared.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './authGuard.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { toDoList } from './Services/toDoList.service';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5001'],
        disallowedRoutes:[]
      }
    }),
    NgbModule
  ],
  providers: [SharedService,AuthGuard,toDoList],
  bootstrap: [AppComponent]
})
export class AppModule { }
