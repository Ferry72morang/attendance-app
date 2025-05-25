import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserDto {
  id: number;
  userName: string;
  name: string;
  designation: string,
  role : string
  // tambah sesuai field dari backend
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  findUsers(userName?: string): Observable<UserDto[]> {
    let params = new HttpParams();
    if (userName) {
      params = params.set('userName', userName);
    }
    return this.http.get<UserDto[]>(this.apiUrl, { params });
  }
}
