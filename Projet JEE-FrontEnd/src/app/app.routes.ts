import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { TechnicienUserComponent } from './components/technicien-user/technicien-user.component';
import { EMPDashboardComponent } from './components/emp-dashboard/emp-dashboard.component';
export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
    {path:'Empdashboard',component:EMPDashboardComponent,canActivate:[authGuard]},
    {path:'technicien-dashboard',component:TechnicienUserComponent,canActivate:[authGuard]}
];
