import { Route } from '@angular/router';
import { NotFoundPageComponent } from './pages/notFoundPage.component';

export const menuRouts: CustomRoute[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/homePage.component').then((c) => c.HomePageComponent),
    data: {
      title: 'Kims Angular Libs',
    },
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./pages/calendar/calendarPage.component').then(
        (c) => c.CalendarPageComponent
      ),
    data: {
      title: 'Calendar',
    },
  },
];

export const appRoutes: Route[] = [
  ...menuRouts,
  {
    path: '**',
    component: NotFoundPageComponent,
    data: {
      title: 'Not Found',
    },
  },
  //   {
  //     path: 'datepicker',
  //     loadComponent: () =>
  //       import('./pages/examples/datepicker.component').then(
  //         (c) => c.DatepickerComponent
  //       ),
  //     data: {
  //       title: 'Datepicker',
  //     },
  //   },
  //   {
  //     path: 'rangepicker',
  //     loadComponent: () =>
  //       import('./pages/examples/rangepicker/rangepicker.component').then(
  //         (c) => c.RangepickerComponent
  //       ),
  //     data: {
  //       title: 'Rangepicker',
  //     },
  //   },
];

export interface CustomRoute extends Route {
  data: {
    title: string;
  };
}
