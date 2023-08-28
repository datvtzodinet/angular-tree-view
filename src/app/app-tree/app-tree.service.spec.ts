import { TestBed } from '@angular/core/testing';

import { AppTreeService } from './app-tree.service';

describe('AppTreeService', () => {
  let service: AppTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
