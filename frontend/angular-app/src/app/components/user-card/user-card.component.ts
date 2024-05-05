import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../environments/environment';

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
  @Input() allApprovedDocuments!: {
    receipt: string;
    ead: string;
    i983: string;
    i20: string;
  };
  @Input() startDate!: string | null;
  @Input() endDate!: string | null;
  @Input() daysRemaining!: string | number;
  @Input() showAction: boolean = true;
  @Input() showAllApprovedFiles: boolean = true;

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
    console.log('checking documentId');
    console.log(documentId);
    this.sendReviewRequest(documentId, 'Approved');
  }

  rejectDocument(documentId: string, comment?: string): void {
    this.sendReviewRequest(documentId, 'Rejected', comment);
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
          window.location.reload();
        },
        error: (error) => {
          console.error('Error sending review request:', error);
        },
      });
  }

  // send email to user
  public sendEmail(toName: string, documentName: string) {
    emailjs.init(environment.EMAILJS_USER_ID);

    var templateParams = {
      to_name: toName,
      document_name: documentName,
    };

    emailjs.send('service_rktkncq', 'template_91iuxc9', templateParams).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Email sent successfully!');
      },
      function (err) {
        console.log('FAILED...', err);
      }
    );
  }
}
