import {
  Directive,
  effect,
  inject,
  Signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CalendarDirective } from './calendar.directive';
import { CalendarGrid } from '@kims-libs/core';

interface CalendarStateContext {
  $implicit: {
    year: Signal<number>;
    monthIndex: Signal<number>;
    month: Signal<string>;
    grid: Signal<CalendarGrid>;
  };
}

@Directive({
  selector: '[calendarState]',
  standalone: true,
})
export class CalendarStateDirective {
  private _calendar = inject(CalendarDirective);

  private _templateRef = inject(TemplateRef);
  private _viewContainer = inject(ViewContainerRef);

  constructor() {
    effect(
      () => {
        this._viewContainer.clear();

        this._viewContainer.createEmbeddedView(this._templateRef, {
          $implicit: {
            year: this._calendar.year,
            monthIndex: this._calendar.monthIndex,
            month: this._calendar.month,
            grid: this._calendar.grid,
          },
        });
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  static ngTemplateContextGuard(
    dir: CalendarStateDirective,
    ctx: unknown
  ): ctx is CalendarStateContext {
    return true;
  }
}
