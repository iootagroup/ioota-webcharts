import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HealthSafetyAPIService } from 'src/app/health-safety-api.service';
import { ChartsModule } from 'ng2-charts';
import { interval, Observable } from 'rxjs';
import { takeWhile, tap, startWith, switchMap } from 'rxjs/operators';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  liveTable = {
    data: [],
    label: 'Air quality'
  };

  liveData: any;
  dataObs$: Observable<any>;
  alive = true;

  public lineChartData: any[] = [
    this.liveTable
  ];
  public lineChartLabels: any[] = [
    '29 day', '28 day', '27 day', '26 day', '25 day', '24 day', '23 day', '22 day', '21 day',
    '10 day', '19 day', '18 day', '17 day', '16 day', '15 day', '14 day', '13 day', '12 day', '11 day',
    '10 day', '9 day', '8 day', '7 day', '6 day', '5 day', '4 day', '3 day', '2 day', '1 day',
     'Today'
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
      data: [],
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

    this.getHistoryData();

  }

  getHistoryData () {
    let startTime, endTime;

    for (let i = 0; i < 30; i++) {

      endTime = moment().subtract(i, 'day');
      startTime = moment().subtract(i + 1, 'day');

      this.hsapi.getSearch('airquality', startTime.toISOString(), endTime.toISOString(), 86400, 0)
      .subscribe(
        APIdata => {
          this.liveData = APIdata;
          let sum = 0;
          let avg = 0;

          for (const key of Object.keys(this.liveData.data)) {
            sum += this.liveData.data[key].value;
          }
          if (sum > 0) {
            avg = sum / this.liveData.data.length;
          }
          this.liveTable.data[29 - i] = avg;

          this.lineChartData = [this.liveTable];
        },
        err => console.log(err)
      );
    }

  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
