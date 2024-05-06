import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

// <input type="text" placeholder="Street" [(ngModel)]="street" name="street">
// <input type="text" placeholder="Apt" [(ngModel)]="streetLine2" name="streetLine2">
//   <input type="text" placeholder="City" [(ngModel)]="city" name="city">
//   <input type="text" placeholder="State" [(ngModel)]="state" name="state">
//   <input type="text" placeholder="Zip" [(ngModel)]="zip" name="zip">

@Component({
  selector: 'app-house-modal',
  templateUrl: './house-modal.component.html',
  styleUrls: ['./house-modal.component.css']
})
export class HouseModalComponent implements OnInit {

  // address: object = {};
  street: string="";
  streetLine2 : string="";
  city: string="";
  state: string=""
  zip: string="";
  landlordName: string = "";
  landlordPhone: string = "";
  landlordEmail: string = "";
  beds: string = "";
  mattresses: string = "";
  tables: string = "";
  chairs: string = "";


  constructor(
    public dialogRef: MatDialogRef<HouseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  async onNoClick($event: any): Promise<void> {
    const newHouse = {
      street: this.street,
      streetLine2: this.streetLine2,
      city: this.city,
      state: this.state,
      zip: this.zip,
      landlordName: this.landlordName,
      landlordPhone: this.landlordPhone,
      landlordEmail: this.landlordEmail,
      beds: this.beds,
      mattresses: this.mattresses,
      tables: this.tables,
      chairs: this.chairs
    };

    //if this is submitted other if it is cancel dont do it
    if($event.target.innerHTML === "Submit"){
          //make the url
      const url = 'http://localhost:3000/user/hr/newHouse'; 
      try {
        // Send this
        const response = await this.http.put(url, newHouse).toPromise();
        // Console log
        console.log(response, "======");
      } catch (error) {
        // Handle error here

        console.error('Error:', error);
        throw error;
      }

    }



    // Close the dialog
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}