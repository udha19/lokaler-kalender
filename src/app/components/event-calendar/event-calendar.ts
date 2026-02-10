import { Holyday } from './../../services/holyday';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { EventCalendar as EC } from '@dhx/trial-eventcalendar';

@Component({
  selector: 'app-event-calendar',
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: './event-calendar.html',
  styleUrl: './event-calendar.scss',
})
export class EventCalendar implements OnInit {
  @ViewChild('container', { static: true }) calendar_container!: ElementRef;
  private _calendar!: EC;

  country = 'ID';
  year = 2026;
  events: any[] = [];

  constructor(private holyday: Holyday) {}

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation() {
    this.holyday.getLocation().subscribe({
      next: (data: any) => {
        this.country = data['location']['country_code2'];
      },
      error: (err) => this.getHolyday(),
      complete: () => this.getHolyday(),
    });
  }

  getHolyday() {
    this.holyday.getHolyday(this.year, this.country).subscribe((res: any) => {
      res.map((day: any, idx: number) => {
        const i = {
          id: idx,
          type: 'rest',
          start_date: new Date(day.date),
          end_date: new Date(day.date),
          text: day.localName,
          details: day.name,
          color: {
            background: '#BA282E',
            border: '#ff8080',
            textColor: '#fff',
          },
        };
        this.events.push(i);
      });
      this.buildCalendar();
    });
  }

  buildCalendar() {
    this._calendar = new EC(this.calendar_container.nativeElement, {
      events: this.events,
      date: new Date(),
    });
  }
}
