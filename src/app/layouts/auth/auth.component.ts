import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
