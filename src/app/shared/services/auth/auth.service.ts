import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isBrowser!: boolean
  token$ = new BehaviorSubject<string>('')

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId)
    if (this.isBrowser) {
      this.token$.next(JSON.stringify(localStorage.getItem('token')))
      let token
      this.token$.subscribe(val => token = val)

      if (token === 'null') {
        this.token$.next('')
      }
    }
  }
  loading$ = new BehaviorSubject<boolean>(false)

  async sign(val: { email: string, password: string }) {
    if (this.isBrowser) {
      try {
        this.loading$.next(true)
        const response = await this.http.post<{ id: number, token: string }>('register', val).toPromise();
        localStorage.setItem('token', `${response?.token}`)
        this.token$.next(`${response?.token}`)
      } catch (error) {
        this.snackbar.open(`'Error during registration:' ${error}`, 'Close', { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
      } finally {
        this.loading$.next(false);
        this.router.navigate(['/'])
        this.snackbar.open('Signed Up successfully', 'Close', { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
      }
    }
  }
  async login(val: { email: string, password: string }) {
    if (this.isBrowser) {
      try {
        this.loading$.next(true)
        const response = await this.http.post<{ id: number, token: number }>('login', val).toPromise();
        localStorage.setItem('token', `${response?.token}`)
        this.token$.next(`${response?.token}`)
      } catch (error) {
        this.snackbar.open(`'Error during registration:' ${error}`, 'Close', { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
      } finally {
        this.loading$.next(false);
        this.router.navigate(['/'])
        this.snackbar.open('Signed In successfully', 'Close', { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
      }
    }
  }

  logOut() {
    if (this.isBrowser) {
      localStorage.removeItem('token')
      this.token$.next('')
      this.snackbar.open('Logged out successfully', 'Close', { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
    }
  }
}
/*
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isBrowser!: boolean
  token$ = new BehaviorSubject<string>('')

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar, @Inject(PLATFORM_ID) platformId: Object, private translateService: TranslateService) {
    this.isBrowser = isPlatformBrowser(platformId)
    if (this.isBrowser) {
      this.token$.next(JSON.stringify(localStorage.getItem('token')))
      let token
      this.token$.subscribe(val => token = val)

      if (token === 'null') {
        this.token$.next('')
      }
    }
  }
  loading$ = new BehaviorSubject<boolean>(false)

  async sign(val: { email: string, password: string }) {
    if (this.isBrowser) {
      try {
        this.loading$.next(true)
        const response = await this.http.post<{ id: number, token: string }>('register', val).toPromise();
        localStorage.setItem('token', `${response?.token}`)
        this.token$.next(`${response?.token}`)
      } catch (error) {
        this.snackbar.open(this.translateService.instant('snackbar.registrationError') + ' ' + error, this.translateService.instant('snackbar.Close'), { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
      } finally {
        this.loading$.next(false);
        this.router.navigate(['/'])
        this.snackbar.open(this.translateService.instant('snackbar.registrationSuccess'), this.translateService.instant('snackbar.Close'), { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
      }
    }
  }
  async login(val: { email: string, password: string }) {
    if (this.isBrowser) {
      try {
        this.loading$.next(true)
        const response = await this.http.post<{ id: number, token: number }>('login', val).toPromise();
        localStorage.setItem('token', `${response?.token}`)
        this.token$.next(`${response?.token}`)
      } catch (error) {
        this.snackbar.open(this.translateService.instant('snackbar.loginError') + ' ' + error, this.translateService.instant('snackbar.Close'), { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
      } finally {
        this.loading$.next(false);
        this.router.navigate(['/'])
        this.snackbar.open(this.translateService.instant('snackbar.loginSuccess'), this.translateService.instant('snackbar.Close'), { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
      }
    }
  }

  logOut() {
    if (this.isBrowser) {
      localStorage.removeItem('token')
      this.token$.next('')
      this.snackbar.open(this.translateService.instant('snackbar.logoutSuccess'), this.translateService.instant('snackbar.Close'), { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
    }
  }
}
*/
