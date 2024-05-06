import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from 'src/app/interfaces/userinterface';

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.css'],
})
export class HiringManagementComponent implements OnInit {
  constructor(private http: HttpClient) {}
  allUsers: Person[] = [];
  pendingUsers: Person[] = [];
  rejectedUsers: Person[] = [];
  approvedUsers: Person[] = [];
  viewUser: any = {};
  status: string = ``;
  statusOptions: any = [`Approved`, `Rejected`];
  viewWindow: string = `Pending`;

  clickHandler = (user: any) => {
    console.log(user);
    if (user.dob) {
      user.dob = user.dob.split(`T`)[0];
    }
    if (user.workAuthorizationStart) {
      user.workAuthorizationStart = user.workAuthorizationStart.split(`T`)[0];
    }
    if (user.workAuthorizationEnd) {
      user.workAuthorizationEnd = user.workAuthorizationEnd.split(`T`)[0];
    }
    this.viewUser = user;
  };

  setViewSection = (view: string) => {
    this.viewWindow = view;
  };

  updateStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/hr/onboarding/updateUser`,
        {
          method: `PUT`,
          headers: {
            'Content-Type': `application/json`,
          },
          body: JSON.stringify({
            userId: this.viewUser._id,
            userInfo: this.viewUser,
          }),
        }
      );
      const result = await response.json();

      console.log(result);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  onSubmit = () => {
    if (this.status != '') {
      this.viewUser.onboardingStatus = this.status;
      this.updateStatus();
    }
    this.status = ``;
  };

  changeStatus = (e: any) => {
    this.status = e.target.value;
  };

  ngOnInit(): void {
    // Fetch all users
    this.http
      .get<any[]>(`http://localhost:3000/hr/onboarding/getAllUsers`)
      .subscribe((response) => {
        this.allUsers = response;
        this.pendingUsers = response.filter(
          (user) => user.onboardingStatus === `Pending`
        );
        this.rejectedUsers = response.filter(
          (user) => user.onboardingStatus === `Rejected`
        );
        this.approvedUsers = response.filter(
          (user) => user.onboardingStatus === `Approved`
        );
        console.log(this.approvedUsers);
        console.log(this.allUsers);
      });
  }
}
