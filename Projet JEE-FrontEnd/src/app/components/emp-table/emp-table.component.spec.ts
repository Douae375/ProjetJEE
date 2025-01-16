import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMPTableComponent } from './emp-table.component';

describe('EMPTableComponent', () => {
  let component: EMPTableComponent;
  let fixture: ComponentFixture<EMPTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EMPTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMPTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
