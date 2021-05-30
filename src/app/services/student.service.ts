import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }
  public getAllStudent(): Observable<any>
  {
    return this.httpClient.get(`${Student_URL}`)
  }
}
