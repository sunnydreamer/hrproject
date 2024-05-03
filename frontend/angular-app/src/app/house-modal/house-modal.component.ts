
import { MatDialog } from '@angular/material/dialog';
// import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-house-modal',
  templateUrl: './house-modal.component.html',
  styleUrls: ['./house-modal.component.css']
})
export class HouseModalComponent implements OnInit {

  // @Input() houses: string;

  address: string = "";
  landlordName: string = "";
  landlordContact: string ="";
  beds: string ="";
  mattresses: string ="";
  tables: string ="";
  chairs: string ="";

  constructor(
    public dialogRef: MatDialogRef<HouseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }



}