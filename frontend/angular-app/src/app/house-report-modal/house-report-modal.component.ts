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
    // console.log(data)
    //use this for submit 
    // console.log(data.houseId)
  }

  changeComment(){

    const payload = {
      reportId: this.data.report._id,
      comment: this.data.report.housingComments,
      username: "yinengzhang",
      userId: "6638203ebf036323b23a3262"
    };



    this.http.put("http://localhost:3000/user/housing/comment/change", payload, { 
      headers: {
        authenticate: "true"
      }
    })
    .subscribe(
      (response: any) => {
        console.log(response);
        this.dialogRef.close();

        // setIsOpen(false);
      },
      (error: any) => {
        console.error(error);
        // setIsOpen(true);
      }
    );

  

  }

  addComment(){

    const payload = {
      reportId: this.data.report._id,
      comment: this.newComment,
      username: "yinengzhang",
      userId: "6638203ebf036323b23a3262"
    };

    // console.log(payload)


    // Make HTTP PUT request
    this.http.put<any>('http://localhost:3000/user/housing/comment/new', payload, { headers: { authenticate: 'true' } })
      .subscribe(
        response => {
          console.log(response);

        },
        error => {
          console.error(error);
        }
      );
      this.dialogRef.close();
      window.location.reload();


  }



  async onNoClick($event: any): Promise<void> {
    // Close the dialog
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}