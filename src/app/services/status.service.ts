import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Status_URL} from 'src/app/app.constants'
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient: HttpClient) { }

    public getAllStatus(): Observable<any>
    {
      return this.httpClient.get(`${Status_URL}`)
    }

    public addStatus(status: Status): Observable<any>
    {
      status.id=0;
      return this.httpClient.post(`${Status_URL}`,status)
    }

    public updateStatus(status: Status): Observable<any>
    {
      return this.httpClient.put(`${Status_URL}`,status)
    }

    public deleteStatus(id: number): Observable<any>
    {
      return this.httpClient.delete(`${Status_URL}/${id}`)
    }
}
