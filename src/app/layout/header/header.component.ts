import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // <-- Tambahkan ini

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { } // <-- Inject di sini

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // <--- Sesuaikan path jika perlu
  }
}
