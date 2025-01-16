import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketChartComponent } from './conge-chart.component';

describe('TicketChartComponent', () => {
  let component: TicketChartComponent;
  let fixture: ComponentFixture<TicketChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
