import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component'
import { CalendarComponent } from './calendar/calendar.component'
import { WelcomeComponent } from './welcome/welcome.component';
import { MusicianComponent } from './musician/musician.component';
import { InstrumentComponent } from './instrument/instrument.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'instruments',
    component: InstrumentComponent
  },
  {
    path: 'musicians',
    component: MusicianComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
