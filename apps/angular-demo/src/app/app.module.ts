import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule } from '@kims-libs/angular-calendar';
import { CalendarGridComponent } from './calendar/calendar-grid.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CalendarComponent,
    CalendarModule,
    CalendarGridComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
