import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseReportModalComponent } from './house-report-modal.component';

describe('HouseReportModalComponent', () => {
  let component: HouseReportModalComponent;
  let fixture: ComponentFixture<HouseReportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseReportModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
