import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private baseUrl = 'http://localhost:8080/attendance';

  constructor(private http: HttpClient) {}

  // contoh di AttendanceService
getAttendance(userId: number): Observable<any> {
 return this.http.get(`${this.baseUrl}/${userId}`);
}

  tapIn(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/tap-in?userId=${userId}`, {});
  }

  tapOut(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/tap-out?userId=${userId}`, {});
  }
  
}
