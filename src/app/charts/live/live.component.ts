import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HealthSafetyAPIService } from 'src/app/health-safety-api.service';
import { ChartsModule } from 'ng2-charts';
import { interval, Observable } from 'rxjs';
import { takeWhile, tap, startWith, switchMap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

  liveTable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  liveData: any;
  dataObs$: Observable<any>;
  alive = true;

  public lineChartData: any[] = [
    { data: this.liveTable, label: 'Air quality' }
    /**
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
     */
  ];
  public lineChartLabels: any[] = [
    '5sec', '10sec', '15sec', '20sec', '25sec', '30sec',
    '35sec', '40sec', '45sec', '50sec'
  ];

  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: any[] = [
    { // grey
      // backgroundColor: 'rgba(148,159,177,0.2)',
      backgroundColor: 'rgb(0, 0, 0, 0.7)',
      // borderColor: 'rgba(148,159,177,1)',
      borderColor: '#f57300',
      pointBackgroundColor: '#f57300',
      pointBorderColor: '#414141',
      pointHoverBackgroundColor: '#414141',
      // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      pointHoverBorderColor: '#000'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private hsapi: HealthSafetyAPIService) { }

  ngOnInit() {
    console.log(this.lineChartLabels);

    this.liveTable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


    this.hsapi.getHealth()
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );

    this.getTestData();
  }

  getTestData() {
    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.hsapi.getSearch('test', '', '', 10, 0))
      )
      .subscribe(
        data => {
          this.liveData = data;

          for (const key of Object.keys(this.liveData.data)) {
            this.liveTable[key] = this.liveData.data[key].value;
          }

          this.lineChartData = this.liveTable;

          console.log(this.liveTable);
        },
        err => console.log(err)
      );
  }

  public randomize(): void {
    const lineChartData: any[] = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
