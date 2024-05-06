import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.location.href = 'http://localhost:5173/user/send-email';
  }

}
