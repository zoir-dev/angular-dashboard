import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/users/users.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService, } from '@ngx-translate/core';
import { AppModule } from '../../../../app.module';
import { LangService } from '../../../../shared/services/lang/lang.service';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, AppModule],
  providers: [TranslateModule, LangService],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  myForm!: FormGroup;
  loading: boolean = false;

  name: string = ''
  job: string = ''


  constructor(public dialog: MatDialog, private fb: FormBuilder, private usersService: UsersService, private langService: LangService, @Inject(PLATFORM_ID) platformId: Object, private translateService: TranslateService) {
    this.usersService.loading$.subscribe(val => {
      this.loading = val
      this.myForm?.get('name')?.disable({ onlySelf: true, emitEvent: false });
      this.myForm?.get('job')?.disable({ onlySelf: true, emitEvent: false });
    })
    this.usersService.editingUser$.subscribe(val => { this.name = val.first_name, this.job = val.email })
    if (isPlatformBrowser(platformId)) {
      this.langService.lang$.subscribe(val => this.translateService.use(val))
    }
  }

  openDialog() {
    this.dialog.open(FormComponent, {});
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: new FormControl({ value: this.name, disabled: this.loading }, [Validators.required, Validators.minLength(3)]),
      job: new FormControl({ value: this.job, disabled: this.loading }, [Validators.required, Validators.minLength(5)]),
    })
  }

  getError(errorName: string) {
    return this.myForm.controls[errorName]
  }

  submit() {
    this.name ? this.usersService.editUser(this.myForm, this.dialog) :
      this.usersService.createUser(this.myForm, this.dialog)
  }

  canExit(): boolean {
    if (this.myForm.value.name !== '' || this.myForm.value.job !== '') {
      return confirm('Are u sure to leave without saving data?')
    }
    return true
  }

}
