import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HealthSafetyAPIService {

  constructor(private http: HttpClient) { }


  /**
   *  Test the API response
   */
  getHealth() {
    return this.http.get(environment.API_URL + '/health');
  }

  /**
   *  Test the API response
   */
  getSearch(type: string = '', start: string = '', end: string = '', limit: number = 100, from: number = 0) {
    let queryString = '';

    if (type != ''){
      queryString += 'type=' + type;
    }

    return this.http.get(environment.API_URL + '/api/sensordata?' + queryString);
  }
}
