import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent {
  userId: number | null = null;
  attendanceList: any[] = []; 
  error: string = '';
  displayedColumns: string[] = ['userId', 'userName', 'tapIn', 'tapOut'];

  constructor(private http: HttpClient) {}

  fetchAttendance(): void {
    const url = 'http://localhost:8080/attendance';
    let params = new HttpParams();

    if (this.userId) {
      params = params.set('userId', this.userId.toString());
    }

    this.http.get<any[]>(url, { params }).subscribe({
      next: (data) => {
        // jika backend mengembalikan 1 object, jadikan array
        this.attendanceList = Array.isArray(data) ? data : [data];
        this.error = '';
      },
      error: () => {
        this.attendanceList = [];
        this.error = 'Data tidak ditemukan!';
      }
    });
  }
}
