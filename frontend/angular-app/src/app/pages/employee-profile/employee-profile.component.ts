import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {Person} from "../../interfaces/userinterface";



@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  search: string = "";
  // people: object = [];
  people: any[]= []; 
  peopleStatic: any[]= []; 



  //change this, people here
  onSearchChange($event: any){
    // perform the change here
    // console.log(JSON.stringify(this.people[0]))

    const searchTerm = $event.target.value
    const filteredPeople = this.peopleStatic.filter(person => {
      const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
      // Check if the search term is present in any of the fields
      return person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             person.preferredName.toLowerCase().includes(searchTerm.toLowerCase()) || 
             fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    this.people = filteredPeople;
  }
  
  //inject the http here
  constructor(private http: HttpClient) {

   }
  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/user/hr/userprofiles').subscribe(response => {
      this.people = response;
      this.peopleStatic = response;
      // sort alpha by last name
      this.people.sort((a, b) => {
        const lastNameA = a.lastName.toUpperCase();
        const lastNameB = b.lastName.toUpperCase();
      
        if (lastNameA > lastNameB) {
          return -1;
        }
        if (lastNameA < lastNameB) {
          return 1;
        }
        return 0;
      });
      
    });
  }

}

