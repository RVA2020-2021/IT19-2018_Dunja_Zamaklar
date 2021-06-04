import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student_URL, Student_URL_Departman } from '../app.constants';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }
  public getAllStudent(): Observable<any>
  {
    return this.httpClient.get(`${Student_URL}`)
  }

  public getStudentiDepartmanId(id: number): Observable<any>
  {
    return this.httpClient.get(`${Student_URL_Departman}/${id}`)
  }

  public addStudent(student: Student): Observable<any>
  {
    student.id=0;
    return this.httpClient.post(`${Student_URL}`,student)
  }

  public updateStudent(student: Student): Observable<any>
  {
    return this.httpClient.put(`${Student_URL}`,student)
  }

  public deleteStudent(id: number): Observable<any>
  {
    return this.httpClient.delete(`${Student_URL}/${id}`)
  }
}
