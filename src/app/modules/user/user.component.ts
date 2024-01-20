import { Component, OnInit } from '@angular/core';
import { UsersService } from '../home/services/users/users.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgIf, MatCardModule, MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  user: any
  loading$ = new BehaviorSubject<boolean>(false)

  constructor(private usersService: UsersService, private snackbar: MatSnackBar, private activateRouter: ActivatedRoute) { }


  ngOnInit(): void {
    const id: number = +this.activateRouter.snapshot.params['user']
    try {
      this.loading$.next(true)
      this.usersService.getUser(id || 1).subscribe(val => {
        this.loading$.next(false)
        this.user = val.data
      })
    } catch (error) {
      this.snackbar.open(`Erro: ${error}`, 'Close', { horizontalPosition: 'right', verticalPosition: 'top', duration: 5000 })
    }
  }
}
