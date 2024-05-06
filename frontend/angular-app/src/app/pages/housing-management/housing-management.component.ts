import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HouseModalComponent } from 'src/app/house-modal/house-modal.component';
// import { HouseReportModalComponent } from 'src/app/house-report-modal/house-report-modal.component';
import { HouseReportModalComponent } from 'src/app/house-report-modal/house-report-modal.component';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-housing-management',
  templateUrl: './housing-management.component.html',
  styleUrls: ['./housing-management.component.css']
})
export class HousingManagementComponent implements OnInit {

  houses: Array<object> = [];
  currHouse : any = {};


  showHouse($event: any){
    this.currHouse = $event;
      // console.log(this.currHouse, this.currHouse._id)

  }

  constructor(public dialog: MatDialog, private http: HttpClient) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(HouseModalComponent, {
      width: '50vw',
      height: '50vh',
      // data: { /* optional data to pass to the dialog */ }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });

  }
  // console.log(this.currHouse.housingReport)

  openDialog2(report : any): void {
    const dialogRef = this.dialog.open(HouseReportModalComponent, {
      width: '75vw',
      height: '75vh',
      // You can pass data to the dialog if needed
      data: { 
        houseId: this.currHouse._id,
        report: report
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/user/housing/all').subscribe(response => {
      // console.log(response);
      this.houses = response;
      this.currHouse = this.houses[0];

    });
  }
}
