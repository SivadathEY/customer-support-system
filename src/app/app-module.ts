import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
 
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
// import { Login } from './login/login';
import { Login } from './auth/login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { Register } from './register/register';
 
@NgModule({
  declarations: [
    App,
    Login,
    DashboardComponent,
    Register
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule {}
 