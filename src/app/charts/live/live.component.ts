import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HealthSafetyAPIService } from 'src/app/health-safety-api.service';
import { ChartsModule } from 'ng2-charts';
import { interval, Observable } from 'rxjs';
import { takeWhile, tap, startWith, switchMap } from 'rxjs/operators';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [
  // {
  //   type: 'success',
  //   message: 'This is an success alert',
  // }, {
  //   type: 'info',
  //   message: 'This is an info alert',
  // }, {
  //   type: 'warning',
  //   message: 'This is a warning alert',
  // }, {
  // type: 'danger',
  // message: 'This is a danger alert',
  // }
];


@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

  liveTable = {
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    label: 'Air quality'
  };

  liveData: any;
  dataObs$: Observable<any>;
  alive = true;

  alerts: Alert[];

  public lineChartData: any[] = [
    this.liveTable
  ];
  public lineChartLabels: any[] = [
    '55sec', '50sec', '45sec', '40sec', '35sec', '30sec',
    '25sec', '20sec', '15sec', '10sec', '5sec', '0sec'
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

    /**
     * Empty table if network is down
     */
    this.liveTable = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      label: 'Air quality'
    };

    /**
     * Test API request
     */
    this.hsapi.getHealth()
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );

    this.getLiveData();

    this.alerts = Array.from(ALERTS);
  }

  getLiveData() {
    let nyt = moment();

    let viimemin = moment(nyt).subtract(1, 'minute');

    interval(5000)
      .pipe(
        tap(() => {
          nyt = moment();
          viimemin = moment(nyt).subtract(1, 'minutes');
        }),
        startWith(0),
          switchMap(() => this.hsapi.getSearch('airquality', viimemin.toISOString(), nyt.toISOString(), 12, 0))
        )
      .subscribe(
        APIdata => {
          this.liveData = APIdata;

          for (const key of Object.keys(this.liveData.data)) {
            this.liveTable.data[key] = this.liveData.data[key].value;

          }
          console.log(this.liveTable.data[this.liveTable.data.length - 1]);

          if (this.liveTable.data[this.liveTable.data.length - 1] > 11) {

            const showAlert: Alert = {
              type: 'danger',
              message: 'Air is bad!'
            };

            this.alerts.push(showAlert);
            setTimeout(() => this.close(showAlert), 4000);
          }

          this.lineChartData = [this.liveTable];
          console.log(this.lineChartData);
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
    console.log(this.lineChartData);
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }
}
