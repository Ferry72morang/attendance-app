import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

export interface UserDto {
  id: number;
  userName: string;
  name: string;
  designation: string;
  role: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  searchTerm = '';
  displayedColumns: string[] = ['no', 'userName', 'name', 'role', 'actions'];
  dataSource = new MatTableDataSource<UserDto>([]);
  pageIndex = 0;
  pageSize = 10;
  totalElements = 0;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // this.searchUsers();
  }

  searchUsers() {
    let params = new HttpParams()
      .set('page', this.pageIndex.toString())
      .set('size', this.pageSize.toString());

    if (this.searchTerm) {
      params = params.set('userName', this.searchTerm);
    }

    this.http.get<PageResponse<UserDto>>('http://localhost:8080/user', { params }).subscribe({
      next: (res) => {
        this.dataSource.data = res.content;
        this.totalElements = res.totalElements;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.searchUsers();
  }

  deleteUser(userId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(`http://localhost:8080/user/deleteByUserId`, {
          params: new HttpParams().set('userId', userId.toString())
        }).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(user => user.id !== userId);
            this.totalElements--; // Kurangi total data
            this.snackBar.open('Data Berhasil Dihapus!', 'Tutup', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          },
          error: (err) => {
            console.error('Gagal menghapus user:', err);
          }
        });
      }
    });
  }

  openEditDialog(user: UserDto) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.put('http://localhost:8080/user/update-user', result).subscribe({
          next: () => {
            const index = this.dataSource.data.findIndex(u => u.id === result.id);
            if (index !== -1) this.dataSource.data[index] = result;
            this.dataSource._updateChangeSubscription();
            this.snackBar.open('Data Berhasil Diupdate!', 'Tutup', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          },
          error: err => {
            console.error('Gagal update:', err);
          }
        });
      }
    });
  }
}
