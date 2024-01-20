import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: any[] = []

  users$ = new BehaviorSubject<any>([])
  loading$ = new BehaviorSubject<boolean>(false)
  editingUser$ = new BehaviorSubject<any>({})
  deletingUser$ = new BehaviorSubject<any>({})
  token!: string


  constructor(private http: HttpClient, public snackbar: MatSnackBar, private auth: AuthService) {
    this.users$.subscribe(val => this.users = val)
    this.auth.token$.subscribe(val => this.token = val)
  }
  getUsers(page: number): Observable<any> {
    return this.http.get('users?page=' + page)
  }
  getUser(user: number): Observable<any> {
    return this.http.get('users/' + user)
  }

  async createUser(user: any, dialog: MatDialog) {
    try {
      this.loading$.next(true)
      this.http.post('users', user.value).subscribe(_ => {
        this.snackbar.open('Created successfully, but api cannot access to create', 'Close', { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
        this.loading$.next(false)
        dialog.closeAll()
      })
    } catch (error) {
      this.snackbar.open('Error occured while creating', 'Close', { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
    }
  }

  async editUser(user: any, dialog: MatDialog) {
    try {
      this.loading$.next(true)
      this.http.put('users/' + user.id, user.value).subscribe(_ => {
        this.snackbar.open('Updated successfully, but api cannot access to update', 'Close', { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
        this.loading$.next(false)
        dialog.closeAll()
      })
    } catch (error) {
      this.snackbar.open('Error occured while creating', 'Close', { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
    }
  }

  async deleteUser(user: any, page: number) {
    if (confirm(`Are u sure u want to delete ${user.first_name + " " + user.last_name}`))
      try {
        this.loading$.next(true)
        this.deletingUser$.next(user)
        this.http.delete('users/' + user.id).subscribe(_ => {
          this.getUsers(page)
          this.snackbar.open('Deleted successfully, but api cannot access to delete', 'Close', { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
          this.loading$.next(false)
          this.deletingUser$.next({})
        })
      } catch (error) {
        this.snackbar.open('Error occured while deleting', 'Close', { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
      }
  }
}
