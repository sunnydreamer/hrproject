import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-housing-view',
  templateUrl: './housing-view.component.html',
  styleUrls: ['./housing-view.component.css']
})
export class HousingViewComponent implements OnInit {

  @Input() allHouses: Array<any> = [];
  @Output() newItemEvent = new EventEmitter<string>();


  constructor() { }

  selectHouse(selectedHouse: any) {
    // console.log('Selected house:', selectedHouse);
    // Handle selected house here
    //emit the house selected
    this.newItemEvent.emit(selectedHouse);
  }


  ngOnInit(): void {
    
  }

}