import { freezeDate } from './freezeDate';

describe('freezeDate', () => {
  it('prevents modification using setFullYear', () => {
    const date = new Date(2024, 0, 1);
    const frozenDate = freezeDate(date);
    expect(() => frozenDate.setFullYear(2025)).toThrow(
      'Cannot set property setFullYear of frozen Date object'
    );
  });

  it('prevents modification using setMonth', () => {
    const date = new Date(2024, 0, 1);
    const frozenDate = freezeDate(date);
    expect(() => frozenDate.setMonth(5)).toThrow(
      'Cannot set property setMonth of frozen Date object'
    );
  });

  it('allows reading properties', () => {
    const date = new Date(2024, 0, 1);
    const frozenDate = freezeDate(date);
    expect(frozenDate.getFullYear()).toBe(2024);
    expect(frozenDate.getMonth()).toBe(0);
    expect(frozenDate.getDate()).toBe(1);
  });

  it('allows calling non-setter methods', () => {
    const date = new Date(2024, 0, 1, 10, 30, 0);
    const frozenDate = freezeDate(date);
    expect(frozenDate.toISOString()).toBe(date.toISOString());
  });

  it('throws errors for all setter methods', () => {
    const date = new Date(2024, 0, 1);
    const frozenDate = freezeDate(date);
    const setterMethods = [
      'setFullYear',
      'setMonth',
      'setDate',
      'setHours',
      'setMinutes',
      'setSeconds',
      'setMilliseconds',
    ];

    setterMethods.forEach((method) => {
      expect(() =>
        (
          frozenDate as unknown as Record<
            string,
            (...args: unknown[]) => unknown
          >
        )[method]()
      ).toThrow(`Cannot set property ${method} of frozen Date object`);
    });
  });
});
