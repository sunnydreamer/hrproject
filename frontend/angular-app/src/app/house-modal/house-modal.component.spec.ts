import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseModalComponent } from './house-modal.component';

describe('HouseModalComponent', () => {
  let component: HouseModalComponent;
  let fixture: ComponentFixture<HouseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
