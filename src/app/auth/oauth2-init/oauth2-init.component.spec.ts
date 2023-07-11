import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuth2InitComponent } from './oauth2-init.component';

describe('OAuth2InitComponent', () => {
  let component: OAuth2InitComponent;
  let fixture: ComponentFixture<OAuth2InitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OAuth2InitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OAuth2InitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
