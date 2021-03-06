import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import {Observable} from 'rxjs/Rx';
import { Observable } from 'rxjs';
import { AddStudentRequest } from '../models/api-models/add-student-request.model';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-request.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseAPIUrl = 'https://localhost:44339';
  constructor(private httpClient: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseAPIUrl + '/Students');
  }

  getStudent(studentId: String): Observable<Student> {
    return this.httpClient.get<Student>(
      this.baseAPIUrl + '/Students/' + studentId
    );
  }

  updateStudent(
    studentId: String,
    studentRequest: Student
  ): Observable<Student> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      mobile: studentRequest.mobile,
      email: studentRequest.email,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    };

    return this.httpClient.put<Student>(
      this.baseAPIUrl + '/Students/' + studentId,
      updateStudentRequest
    );
  }

  deleteStudent(studentId: string): Observable<Student> {
    return this.httpClient.delete<Student>(
      this.baseAPIUrl + '/Students/' + studentId
    );
  }

  addStudent(studentRequest: Student):Observable<Student> {
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      mobile: studentRequest.mobile,
      email: studentRequest.email,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    };
    return this.httpClient.post<Student>(
      this.baseAPIUrl + '/Students/add',
      addStudentRequest
    );
  }
  uploadImage(studentId: string,file:File):Observable<any>{
    const formData = new FormData();
    formData.append("profileImage",file);
    return this.httpClient.post(this.baseAPIUrl+'/Students/'+studentId+'/upload-image',formData,{
      responseType:'text'
    });
  }

  getImagePath(realtivePath:string){
    return `${this.baseAPIUrl}/${realtivePath}`;
  }
}
