import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ThemeService } from '../../../shared/services/theme/theme.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { LangService } from '../../../shared/services/lang/lang.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, NgIf, AsyncPipe, TranslateModule, AsyncPipe],
  providers: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() forAuth!: boolean

  darkMode: boolean = false;
  token!: string

  constructor(private theme: ThemeService, private router: Router, public authService: AuthService, public langService: LangService) {
    this.theme.darkMode$.subscribe(val => this.darkMode = val)
    this.authService.token$.subscribe(val => this.token = val)
  }

  changeMode(val: boolean) {
    this.theme.changeMode(val)
  }

  navigateToHome() {
    this.router.navigate(['/'])
  }

  login() {
    this.router.navigate(['/auth/login'])
  }

  logOut() {
    this.authService.logOut()
  }


  changeLang(val: any) {
    this.langService.changeLang(val)
  }


}
