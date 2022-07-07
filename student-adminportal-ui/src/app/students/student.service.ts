import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import {Observable} from 'rxjs/Rx';
import {Observable} from 'rxjs';
import { Student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseAPIUrl="https://localhost:44339";
  constructor(private httpClient:HttpClient) { }

  getStudents():Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseAPIUrl+'/Students');
  }

  getStudent(studentId:String):Observable<Student>{
    return this.httpClient.get<Student>(this.baseAPIUrl+'/Students/'+studentId);
  }
}
