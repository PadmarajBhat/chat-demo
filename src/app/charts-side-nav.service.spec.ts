import { TestBed } from '@angular/core/testing';

import { ChartsSideNavService } from './charts-side-nav.service';

describe('ChartsSideNavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartsSideNavService = TestBed.get(ChartsSideNavService);
    expect(service).toBeTruthy();
  });
});
