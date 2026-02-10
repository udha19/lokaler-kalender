import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart } from '@dhx/trial-suite';
import { Holyday } from '../../services/holyday';

@Component({
  selector: 'app-charts',
  imports: [],
  templateUrl: './charts.html',
  styleUrl: './charts.scss',
})
export class Charts implements OnInit, OnDestroy {
  @ViewChild('chart_container', { static: true }) chart_container!: ElementRef;
  private _chart!: Chart;
  chartData: any[] = [];
  color = [
    '#FDFD96', // Pastel Yellow
    '#FFB7CE', // Soft Pink
    '#C1E1C1', // Tea Green
    '#B2CEFE', // Baby Blue
    '#D1D1F0', // Periwinkle
    '#FAD1AF', // Apricot
    '#E2BEF1', // Pale Lavender
    '#97D1DA', // Tiffany Blue
    '#FDF5E6', // Old Lace (Off-white)
    '#FFD1DC', // Cherry Blossom
    '#ECEAE4', // Bone
    '#A7C7E7', // Pastel Blue
  ];

  country = 'ID';
  year = 2026;

  holydayData = [
    {
      id: 'Jan',
      value: 0,
      month: 'Jan',
      color: this.color[0],
      opacity: 1,
    },
    {
      id: 'Feb',
      value: 0,
      month: 'Feb',
      color: this.color[1],
      opacity: 1,
    },
    {
      id: 'Mar',
      value: 0,
      month: 'Mar',
      color: this.color[2],
      opacity: 1,
    },
    {
      id: 'Apr',
      value: 0,
      month: 'Apr',
      color: this.color[3],
      opacity: 1,
    },
    {
      id: 'May',
      value: 0,
      month: 'May',
      color: this.color[4],
      opacity: 1,
    },
    {
      id: 'Jun',
      value: 0,
      month: 'Jun',
      color: this.color[5],
      opacity: 1,
    },
    {
      id: 'Jul',
      value: 0,
      month: 'Jul',
      color: this.color[6],
      opacity: 1,
    },
    {
      id: 'Aug',
      value: 0,
      month: 'Aug',
      color: this.color[7],
      opacity: 1,
    },
    {
      id: 'Sep',
      value: 0,
      month: 'Sep',
      color: this.color[8],
      opacity: 1,
    },
    {
      id: 'Oct',
      value: 0,
      month: 'Oct',
      color: this.color[9],
      opacity: 1,
    },
    {
      id: 'Nov',
      value: 0,
      month: 'Nov',
      color: this.color[10],
      opacity: 1,
    },
    {
      id: 'Dec',
      value: 0,
      month: 'Dec',
      color: this.color[11],
      opacity: 1,
    },
  ];
  constructor(private holyday: Holyday) {}

  ngOnInit() {
    this.holyday.getLocation().subscribe({
      next: (data: any) => {
        this.country = data['location']['country_code2'];

      },
      error: (err) => this.fetchData(),
      complete: () => this.fetchData()
    });
  }

  fetchData() {
    this.holyday.getHolyday(this.year, this.country).subscribe((res: any) => {
      res.map((day: any, idx: number) => {
        const date = day.date.split('-');
        switch (date[1]) {
          case '01':
            this.holydayData[0].value += 1;
            break;
          case '02':
            this.holydayData[1].value += 1;
            break;
          case '03':
            this.holydayData[2].value += 1;
            break;
          case '04':
            this.holydayData[3].value += 1;
            break;
          case '05':
            this.holydayData[4].value += 1;
            break;
          case '06':
            this.holydayData[5].value += 1;
            break;
          case '07':
            this.holydayData[6].value += 1;
            break;
          case '08':
            this.holydayData[7].value += 1;
            break;
          case '09':
            this.holydayData[8].value += 1;
            break;
          case '10':
            this.holydayData[9].value += 1;
            break;
          case '11':
            this.holydayData[10].value += 1;
            break;
          case '12':
            this.holydayData[11].value += 1;
            break;
          default:
            break;
        }
      });
      this.buildChart();
    });
  }

  buildChart() {
    // const chartData = [
    //   {
    //     id: 'Jan',
    //     value: 44.33,
    //     month: 'Jan',
    //     color: 'var(--dhx-color-primary-light-active)',
    //     opacity: 1,
    //   },
    //   {
    //     id: 'Feb',
    //     value: 22.12,
    //     month: 'Feb',
    //     color: 'var(--dhx-color-primary-active)',
    //     opacity: 0.4,
    //   },
    //   {
    //     id: 'Mar',
    //     value: 53.21,
    //     month: 'Mar',
    //     color: 'var(--dhx-color-primary-disabled)',
    //     opacity: 0.6,
    //   },
    //   {
    //     id: 'Apr',
    //     value: 34.25,
    //     month: 'Apr',
    //     color: 'var(--dhx-color-primary-light-hover)',
    //     opacity: 0.2,
    //   },
    // ];
    const final = this.holydayData.filter((item) => item.value !== 0);
    this._chart = new Chart(this.chart_container.nativeElement, {
      data: final,
      type: 'pie',
      series: [
        {
          value: 'value',
          // monochrome: "#0288D1",
          color: 'color',
          text: 'month',
          stroke: 'var(--dhx-background-primary)',
          strokeWidth: 0,
        },
      ],
      legend: {
        values: {
          id: 'value',
          text: 'id',
          color: 'color',
        },
        // monochrome: "#0288D1",
        halign: 'right',
        valign: 'middle',
      },
    });
  }
  ngOnDestroy() {
    this._chart?.destructor();
  }
}
