import { TestBed } from '@angular/core/testing';

import { MultiCalendarService } from './multi-calendar.service';

describe('MultiCalendarService', () => {
  let service: MultiCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
