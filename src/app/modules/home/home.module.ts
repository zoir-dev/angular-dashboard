import { NgModule } from '@angular/core';
import { AsyncPipe, LowerCasePipe, NgFor, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [],
  imports: [NgFor, NgIf, MatTableModule, AsyncPipe, MatProgressSpinnerModule, MatIconModule, RouterLink, MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, LowerCasePipe, MatSortModule
  ],
  exports: [NgFor, NgIf, MatTableModule, AsyncPipe, MatProgressSpinnerModule, MatIconModule, RouterLink, MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, LowerCasePipe, MatSortModule]
})
export class HomeModule { }
