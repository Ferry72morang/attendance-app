// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  // BehaviorSubject untuk status isAdmin
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient) {
    // Saat service diinisialisasi, cek token yang sudah ada
    const token = localStorage.getItem('token');
    if (token) {
      this.updateIsAdmin(token);
    }
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user).pipe(
      tap(res => {
        // Simpan token
        localStorage.setItem('token', res.token);
        // Update status admin
        this.updateIsAdmin(res.token);
      })
    );
  }

  signup(user: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/register`, user, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
}

  private updateIsAdmin(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roles: string[] = payload.roles || [];
      this.isAdminSubject.next(roles.includes('ADMIN'));
    } catch {
      this.isAdminSubject.next(false);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.isAdminSubject.next(false);
  }
}
