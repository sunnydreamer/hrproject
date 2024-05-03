import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HouseModalComponent } from 'src/app/house-modal/house-modal.component';

@Component({
  selector: 'app-housing-management',
  templateUrl: './housing-management.component.html',
  styleUrls: ['./housing-management.component.css']
})
export class HousingManagementComponent implements OnInit {





  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(HouseModalComponent, {
      width: '50vw',
      height: '50vh',
      data: { /* optional data to pass to the dialog */ }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    // 
    
  }
}
