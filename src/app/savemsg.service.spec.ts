import { TestBed } from '@angular/core/testing';

import { SavemsgService } from './savemsg.service';

describe('SavemsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavemsgService = TestBed.get(SavemsgService);
    expect(service).toBeTruthy();
  });
});
