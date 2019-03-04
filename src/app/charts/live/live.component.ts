import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HealthSafetyAPIService } from 'src/app/health-safety-api.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

  constructor(private hsapi: HealthSafetyAPIService) { }

  ngOnInit() {


    this.hsapi.getHealth()
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

}
