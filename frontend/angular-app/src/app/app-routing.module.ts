import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  EmployeeProfileComponent,
  LoginComponent,
  SendEmailComponent,
  VisaStatusComponent,
  HiringManagementComponent,
  HousingManagementComponent,
} from './pages/index';
import { AuthGuard } from './guards/auth.guard';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'send-email', component: SendEmailComponent, data: { title: 'Login' } },
  // { path: 'login', redirectTo: "http://localhost:5173/user/login" },
  {
    path: 'employee-profile',
    component: EmployeeProfileComponent,
    canActivate: [AuthGuard],
    data: { title: 'Employee Profile' },
  },
  {
    path: 'visa-status',
    component: VisaStatusComponent,
    canActivate: [AuthGuard],
    data: { title: 'Visa Status' },
  },
  {
    path: 'hiring-management',
    component: HiringManagementComponent,
    canActivate: [AuthGuard],
    data: { title: 'Hiring Management' },
  },
  {
    path: 'housing-management',
    component: HousingManagementComponent,
    canActivate: [AuthGuard],
    data: { title: 'Housing Management' },
  },
  {
    path: 'error',
    component: ErrorComponent,
  },

  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
