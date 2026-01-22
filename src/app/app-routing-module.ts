// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// // import { Login } from './login/login';

// // import { Dashboard } from './dashboard/dashboard';
// import { DashboardComponent } from './dashboard/dashboard';
//  import {Login} from './auth/login/login';
//  import { Register } from './register/register';
// const routes: Routes = [
//   { path: 'login', component: Login },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: '', pathMatch: 'full', redirectTo: 'login' },
//   { path: '**', redirectTo: 'login' },
//   { path: 'register', component: Register }
// ];
 
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
 









import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { Login } from './auth/login/login';
import { Register } from './register/register';
import { DashboardComponent } from './dashboard/dashboard';
 
const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },      // ✅ MOVE UP
  { path: 'dashboard', component: DashboardComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }              // ✅ ALWAYS LAST
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

