import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule


// <input type="text" placeholder="Street" [(ngModel)]="street" name="street">
// <input type="text" placeholder="Apt" [(ngModel)]="streetLine2" name="streetLine2">
//   <input type="text" placeholder="City" [(ngModel)]="city" name="city">
//   <input type="text" placeholder="State" [(ngModel)]="state" name="state">
//   <input type="text" placeholder="Zip" [(ngModel)]="zip" name="zip">

@Component({
  selector: 'app-house-report-modal',
  templateUrl: './house-report-modal.component.html',
  styleUrls: ['./house-report-modal.component.css'],
  
})
export class HouseReportModalComponent implements OnInit {


  thing: string = ''; 
  newComment: string = "";

  constructor(
    public dialogRef: MatDialogRef<HouseReportModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
    
  ) {

    // console.log(data.report)
    //use this for submit 
    // console.log(data.houseId)
  }

  addComment(){
    console.log("pressed")
  }

  async onNoClick($event: any): Promise<void> {
    // Close the dialog
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}