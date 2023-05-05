import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputtagComponent } from './inputtag.component';

describe('InputtagComponent', () => {
  let component: InputtagComponent;
  let fixture: ComponentFixture<InputtagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputtagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputtagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
