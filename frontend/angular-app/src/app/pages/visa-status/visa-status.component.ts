import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VisaPendingUser } from 'src/app/interfaces/userinterface';

@Component({
  selector: 'app-visa-status',
  templateUrl: './visa-status.component.html',
  styleUrls: ['./visa-status.component.css'],
})
export class VisaStatusComponent implements OnInit {
  constructor(private http: HttpClient) {}
  visaPendingUsers: VisaPendingUser[] = [];
  selectedOption: string = 'Pending';
  allVisaUsers: any[] = [];
  allVisaUsersStatic: any[] = [];
  search: string = '';

  //change this, people here
  onSearchChange($event: any) {
    const searchTerm = $event.target.value;
    const filteredPeople = this.allVisaUsersStatic.filter((person) => {
      return person.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    this.allVisaUsers = filteredPeople;
  }

  ngOnInit(): void {
    // Fetch visa pending users
    this.http
      .get<{ message: string; data: VisaPendingUser[] }>(
        'http://localhost:3000/hr/getVisaPendingUsers'
      )
      .subscribe((response) => {
        this.visaPendingUsers = response.data;
      });

    // Fetch user profiles
    this.http
      .get<{ message: string; data: VisaPendingUser[] }>(
        'http://localhost:3000/hr/getAllVisaUsers'
      )
      .subscribe((response) => {
        this.allVisaUsers = response.data;
        this.allVisaUsersStatic = response.data;
        // sort alpha by last name
        this.allVisaUsers.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        });
      });
  }
}
