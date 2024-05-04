import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() name!: string;
  @Input() workAuthorization!: string;
  @Input() nextStep!: {
    isAllSet: boolean;
    documentId: string;
    documentStatus: string;
    documentLink: string;
    documentName: string;
    action: string;
  };
  @Input() startDate!: string | null;
  @Input() endDate!: string | null;
  @Input() daysRemaining!: string | number;

  constructor(private http: HttpClient) {}

  showNewInput: boolean = false;
  comment: string = '';

  ngOnInit(): void {
    this.comment = '';
  }

  openLink(link: string): void {
    window.open(link, '_blank');
  }

  approveDocument(documentId: string): void {
    this.sendReviewRequest(documentId, 'Approved');
    window.location.reload();
  }

  rejectDocument(documentId: string, comment?: string): void {
    this.sendReviewRequest(documentId, 'Rejected', comment);
    window.location.reload();
  }
  toggleInput(): void {
    this.showNewInput = !this.showNewInput;
  }

  sendReviewRequest(
    documentId: string,
    status: string,
    comment?: string
  ): void {
    const payload = {
      documentId: documentId,
      status: status,
      comment: comment,
    };
    this.http
      .put('http://localhost:3000/hr/reviewDocument', payload)
      .subscribe({
        next: (response) => {
          console.log('Review request sent successfully:', response);
        },
        error: (error) => {
          console.error('Error sending review request:', error);
        },
      });
  }
}
