import { TestBed } from '@angular/core/testing';
import { YearWeekPipe } from './yearWeek.pipe';
import { CALENDAR_CONFIG } from '../calendar.config';

describe('YearWeekPipe', () => {
  let yearWeekPipe: YearWeekPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        YearWeekPipe,
        {
          provide: CALENDAR_CONFIG,
          useValue: {
            weekStart: 0,
          },
        },
      ],
    });

    yearWeekPipe = TestBed.inject(YearWeekPipe);
  });

  it('should create an instance', () => {
    expect(yearWeekPipe).toBeTruthy();
  });

  describe('transform method', () => {
    it('should return correct year-week representation with default options', () => {
      const testDate = new Date(2024, 0, 7); // January 7, 2024 (Sunday)
      const result = yearWeekPipe.transform(testDate);
      expect(result).toBe('2024-00'); // Assuming default format is 'YYYY-ww', and January 7, 2024 is the first week of 2024
    });

    it('should return correct year-week representation with week starting on Wednesday', () => {
      const testDate = new Date(2024, 0, 10); // January 10, 2024 (Wednesday)
      const result = yearWeekPipe.transform(testDate, {
        weekStart: 3,
        mode: 0,
      });
      expect(result).toBe('2024-01'); // Week starts from the first occurrence of Wednesday
    });

    it("should handle December dates that belong to the next year's first week", () => {
      const testDate = new Date(2023, 11, 31); // December 31, 2023 (Sunday)
      const result = yearWeekPipe.transform(testDate, {
        weekStart: 0,
        mode: 1,
      });
      expect(result).toBe('2024-00'); // Should be treated as part of the first week of 2024
    });

    it('should use custom format correctly', () => {
      const testDate = new Date(2024, 0, 15); // January 15, 2024
      const result = yearWeekPipe.transform(testDate, {
        weekStart: 1,
        mode: 1,
        format: 'YYYY-Www-D',
      });
      expect(result).toBe('2024-W02-1'); // Depending on custom format specified
    });
  });
});
