import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: 'attendance', component: AttendanceComponent }
    ]
  },

  // Harus diletakkan paling akhir, agar tidak menimpa route 'layout'
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Fallback jika route tidak cocok
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
