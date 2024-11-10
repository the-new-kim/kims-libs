import { TestBed } from '@angular/core/testing';

import { CalendarGridService } from './calendar-grid.service';

describe('CalendarGridService', () => {
  let service: CalendarGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
