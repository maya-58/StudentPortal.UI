import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gender } from '../models/api-models/gender.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseAPIUrl="https://localhost:44339";

  constructor(private httpClient:HttpClient) { }

  getGenderList():Observable<Gender[]>{
     return this.httpClient.get<Gender[]>(this.baseAPIUrl+'/genders');
  }
}
