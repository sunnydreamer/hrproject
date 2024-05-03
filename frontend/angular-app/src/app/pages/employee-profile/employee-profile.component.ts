import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  search: string = "";
  people: object = {};

  //make request to get all of the users
  //sort alphabetically
  //display them
  //ask gpt to make my profile page into angular
  
  //inject the http here
  constructor(private http: HttpClient) {
    this.http.get('https://jsonplaceholder.typicode.com/todos?_limit=5').subscribe(response => {
      this.people = response;
      console.log(this.people);
    });



   }

  ngOnInit(): void {
  }

}
