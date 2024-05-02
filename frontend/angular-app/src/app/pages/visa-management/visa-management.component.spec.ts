import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaManagementComponent } from './visa-management.component';

describe('VisaManagementComponent', () => {
  let component: VisaManagementComponent;
  let fixture: ComponentFixture<VisaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
