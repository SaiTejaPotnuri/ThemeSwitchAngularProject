import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxtypeComponent } from './checkboxtype.component';

describe('CheckboxtypeComponent', () => {
  let component: CheckboxtypeComponent;
  let fixture: ComponentFixture<CheckboxtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
