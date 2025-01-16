import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicienUserComponent } from './technicien-user.component';

describe('TechnicienUserComponent', () => {
  let component: TechnicienUserComponent;
  let fixture: ComponentFixture<TechnicienUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicienUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicienUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
