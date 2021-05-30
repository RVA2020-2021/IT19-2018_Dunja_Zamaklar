import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Status_URL} from 'src/app/app.constants'

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient: HttpClient) { }

    public getAllStatus(): Observable<any>
    {
      return this.httpClient.get(`${Status_URL}`)
    }
}
