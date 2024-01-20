import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './services/users/users.service';
import { MatTableDataSource, } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HomeModule } from './home.module';
import { FormComponent } from './components/form/form.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeModule, TranslateModule, AppModule],
  providers: [TranslateModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  users: any[] = []
  page: number = 1
  pages!: number
  token!: string

  loading$ = new BehaviorSubject<boolean>(false)
  deletingUser: any = {}
  get$ = new Subject()

  displayedColumns: string[] = ['id', 'email', 'first_name', 'avatar', 'actions'];
  dataSource!: MatTableDataSource<any>;

  constructor(public usersService: UsersService, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog, private snackbar: MatSnackBar, private authService: AuthService, private translateService: TranslateService) {
    this.usersService.deletingUser$.subscribe(val => this.deletingUser = val)
    this.authService.token$.subscribe(val => this.token = val)
  }

  ngOnInit(): void {
    this.getUsers(this.page)
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort
    }
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.pages) {
      this.page = page
      this.getUsers(page);
    }
  }

  getTotalPages(): number[] {
    return Array.from({ length: this.pages }, (_, i) => i + 1);
  }

  async getUsers(page: number) {
    this.loading$.next(true)
    this.usersService.getUsers(page).pipe(takeUntil(this.get$)).subscribe(val => {
      this.usersService.users$.next(val.data)
      this.users = val.data
      this.pages = val.total_pages
      this.dataSource = new MatTableDataSource(this.users)
      this.loading$.next(false)
    })
  }

  addUser() {
    if (this.token) {
      this.dialog.open(FormComponent)
      this.usersService.editingUser$.next({})
    } else {
      const messageKey = 'snackbar.addUserNotLoggedIn';
      const translatedMessage = this.translateService.instant(messageKey);

      this.snackbar.open(translatedMessage, this.translateService.instant('snackbar.Close'), {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 5000,
      });
    }
  }

  async deleteUser(user: any) {
    if (this.token) {
      await this.usersService.deleteUser(user, this.page)
    } else {
      const messageKey = 'snackbar.deleteUserNotLoggedIn';
      const translatedMessage = this.translateService.instant(messageKey);

      this.snackbar.open(translatedMessage, this.translateService.instant('snackbar.Close'), {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 5000,
      });
    }
  }

  async editUser(user: any) {
    if (this.token) {
      this.dialog.open(FormComponent)
      this.usersService.editingUser$.next(user)
    } else {
      const messageKey = 'snackbar.editUserNotLoggedIn';
      const translatedMessage = this.translateService.instant(messageKey);

      this.snackbar.open(translatedMessage, this.translateService.instant('snackbar.Close'), {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 5000,
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  ngOnDestroy(): void {
    this.get$.next(null)
    this.get$.unsubscribe()
  }

}
