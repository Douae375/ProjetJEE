import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMPSidebarComponent } from './emp-sidebar.component';

describe('EMPSidebarComponent', () => {
  let component: EMPSidebarComponent;
  let fixture: ComponentFixture<EMPSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EMPSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EMPSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
