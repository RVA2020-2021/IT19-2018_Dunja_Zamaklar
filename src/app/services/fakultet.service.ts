import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fakultet_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class FakultetService {

  constructor(private httpClient: HttpClient) { }

  public getAllFakultet(): Observable<any>
  {
    return this.httpClient.get(`${Fakultet_URL}`)
  }
}
