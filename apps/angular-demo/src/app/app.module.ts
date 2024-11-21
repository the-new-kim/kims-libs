import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CalendarModule } from '@kims-libs/angular-calendar';
import { FormsModule } from '@angular/forms';
import {
  CustomModelDirective,
  DateFormatDirective,
} from '@kims-libs/angular-datepicker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CalendarModule.forRoot({
      monthNames: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
      ],
      weekDayNames: ['일', '월', '화', '수', '목', '금', '토'],
    }),
    CustomModelDirective,
    DateFormatDirective,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
