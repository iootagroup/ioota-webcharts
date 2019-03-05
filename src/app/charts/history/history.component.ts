import { Component, OnInit } from '@angular/core';
import { HealthSafetyAPIService } from 'src/app/health-safety-api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private hsapi: HealthSafetyAPIService) { }

  ngOnInit() {


    this.hsapi.getSearch()
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

}
