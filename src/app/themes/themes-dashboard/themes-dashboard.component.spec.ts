import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesDashboardComponent } from './themes-dashboard.component';

describe('ThemesDashboardComponent', () => {
  let component: ThemesDashboardComponent;
  let fixture: ComponentFixture<ThemesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemesDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
