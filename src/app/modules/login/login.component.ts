import { Component } from '@angular/core';
import { AuthComponent } from '../../core/components/auth/auth.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
