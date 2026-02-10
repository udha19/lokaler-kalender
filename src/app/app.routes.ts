import { Routes } from '@angular/router';
import { EventCalendar } from './components/event-calendar/event-calendar';
import { Charts } from './components/charts/charts';

export const routes: Routes = [
  { path: '', component: EventCalendar, title: 'Holiday Calendar' },

  // Standard route
  { path: 'chart', component: Charts, title: 'Holiday Chart' },
];
