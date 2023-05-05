import { TestBed } from '@angular/core/testing';

import { CustomthemeService } from './customtheme.service';

describe('CustomthemeService', () => {
  let service: CustomthemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomthemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
