import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementChartComponent } from './department-chart.component';

describe('EquipementChartComponent', () => {
  let component: EquipementChartComponent;
  let fixture: ComponentFixture<EquipementChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipementChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipementChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
