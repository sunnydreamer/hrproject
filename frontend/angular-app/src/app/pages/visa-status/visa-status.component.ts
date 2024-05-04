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
  VisaPendingUsers: VisaPendingUser[] = [];

  ngOnInit(): void {
    this.http
      .get<{ message: string; data: VisaPendingUser[] }>(
        'http://localhost:3000/hr/getVisaPendingUsers'
      )
      .subscribe((response) => {
        console.log(response);
        this.VisaPendingUsers = response.data;
        console.log(this.VisaPendingUsers);
      });
  }
}
