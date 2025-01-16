import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMPDashboardComponent } from './emp-dashboard.component';

describe('EMPDashboardComponent', () => {
  let component: EMPDashboardComponent;
  let fixture: ComponentFixture<EMPDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EMPDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMPDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
