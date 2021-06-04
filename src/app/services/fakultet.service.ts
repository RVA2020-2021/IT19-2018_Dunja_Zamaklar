import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fakultet_URL } from '../app.constants';
import { Fakultet } from '../models/fakultet';

@Injectable({
  providedIn: 'root'
})
export class FakultetService {

  constructor(private httpClient: HttpClient) { }

  public getAllFakultet(): Observable<any>
  {

    return this.httpClient.get(`${Fakultet_URL}`)
  }

  public addFakultet(fakultet: Fakultet):Observable<any>
  {
    fakultet.id=0;
    return this.httpClient.post(`${Fakultet_URL}`,fakultet)
  }

  public updateFakultet(fakultet: Fakultet):Observable<any>
  {
    return this.httpClient.put(`${Fakultet_URL}`,fakultet)
  }

  public deleteFakultet(id: number):Observable<any>
  {
    return this.httpClient.delete(`${Fakultet_URL}/${id}`)
  }

}
