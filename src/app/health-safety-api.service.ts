import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { and } from '@angular/router/src/utils/collection';


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
   *  Search API for relevant data
   */
  getSearch(type: string = '', start: string = '', end: string = '', limit: number = 100, from: number = 0) {
    let queryString = '';
    let andmark = false;

    if (type !== '') {
      queryString += 'type=' + type;
      andmark = true;
    }

    if (start !== '') {
      if (andmark) { queryString += '&'; }
      queryString += 'start=' + start;
      andmark = true;
    }

    if (end !== '') {
      if (andmark) { queryString += '&'; }
      queryString += 'end=' + end;
      andmark = true;
    }

    if (andmark) { queryString += '&'; }
    queryString += 'limit=' + limit + '&from=' + from;

    return this.http.get(environment.API_URL + '/api/sensordata?' + queryString);
  }
}
