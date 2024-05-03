import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-housing-view',
  templateUrl: './housing-view.component.html',
  styleUrls: ['./housing-view.component.css']
})
export class HousingViewComponent implements OnInit {

  constructor() { }
  houses = [
    { name: 'House 1', description: 'Description of House 1' },
    { name: 'House 2', description: 'Description of House 2' },
    { name: 'House 2', description: 'Description of House 2' },
    { name: 'House 2', description: 'Description of House 2' },
    { name: 'House 2', description: 'Description of House 2' },
    { name: 'House 2', description: 'Description of House 2' },
    { name: 'House 2', description: 'Description of House 2' },
    { name: 'House 2', description: 'Description of House 2' },
    { name: 'House 2', description: 'Description of House 2' },
    { name: 'House 2', description: 'Description of House 2' },
    // Add more house objects as needed
  ];

  selectHouse(selectedHouse: any) {
    console.log('Selected house:', selectedHouse);
    // Handle selected house here
  }


  ngOnInit(): void {
    
  }

}