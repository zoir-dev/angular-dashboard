import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, NgIf, AsyncPipe, NgIf, TranslateModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  @Input() login!: boolean
  myForm!: FormGroup;
  loading: boolean = false;


  constructor(private fb: FormBuilder, public auth: AuthService, private router: Router) {
    auth.loading$.subscribe(val => {
      this.loading = val
      this.myForm?.get('email')?.disable({ onlySelf: true, emitEvent: false });
      this.myForm?.get('password')?.disable({ onlySelf: true, emitEvent: false });
    })
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: new FormControl('george.bluth@reqres.in', [Validators.required, Validators.email]),
      password: new FormControl('George', [Validators.required, Validators.minLength(5)]),
    })
  }

  getError(errorName: string) {
    return this.myForm.controls[errorName]
  }

  navigate(url: string) {
    this.router.navigate([url])
  }

  async submit() {
    this.login ? await this.auth.login(this.myForm.value) : await this.auth.sign(this.myForm.value)
  }

}
