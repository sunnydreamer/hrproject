import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingViewComponent } from './housing-view.component';

describe('HousingViewComponent', () => {
  let component: HousingViewComponent;
  let fixture: ComponentFixture<HousingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
