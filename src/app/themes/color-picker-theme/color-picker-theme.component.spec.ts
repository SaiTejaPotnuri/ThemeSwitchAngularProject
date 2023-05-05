import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerThemeComponent } from './color-picker-theme.component';

describe('ColorPickerThemeComponent', () => {
  let component: ColorPickerThemeComponent;
  let fixture: ComponentFixture<ColorPickerThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPickerThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorPickerThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
