import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  EmployeeProfileComponent,
  LoginComponent,
  VisaStatusComponent,
  HiringManagementComponent,
  HousingManagementComponent,
} from './pages/index';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'employee-profile',
    component: EmployeeProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'visa-status',
    component: VisaStatusComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hiring-management',
    component: HiringManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'housing-management',
    component: HousingManagementComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
