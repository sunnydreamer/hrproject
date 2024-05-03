import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeProfileComponent } from './pages/employee-profile/employee-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { VisaManagementComponent } from './pages/visa-management/visa-management.component';
import { HiringManagementComponent } from './pages/hiring-management/hiring-management.component';
import { HousingManagementComponent } from './pages/housing-management/housing-management.component';
import { VisaStatusComponent } from './pages/visa-status/visa-status.component';
import { HttpClientModule } from '@angular/common/http';
import { HousingViewComponent } from './components/housing-view/housing-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HouseModalComponent } from './house-modal/house-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeProfileComponent,
    NavbarComponent,
    LoginComponent,
    EmployeeProfileComponent,
    SearchBarComponent,
    VisaManagementComponent,
    HiringManagementComponent,
    HousingManagementComponent,
    VisaStatusComponent,
    HousingViewComponent,
    HouseModalComponent
  ],
  imports: [BrowserModule,
            AppRoutingModule,
            FormsModule,
            HttpClientModule,
            BrowserAnimationsModule,
            MatDialogModule

          ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
