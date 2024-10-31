import { render } from '@testing-library/react';

import ReactCalendar from './react-calendar';

describe('ReactCalendar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactCalendar />);
    expect(baseElement).toBeTruthy();
  });
});
