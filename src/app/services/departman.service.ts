import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departman_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class DepartmanService {

  constructor(private httpClient: HttpClient) { }

  public getAllDepartman(): Observable<any>
  {
    return this.httpClient.get(`${Departman_URL}`)
  }
}
