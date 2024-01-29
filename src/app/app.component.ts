import { Component, HostBinding, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, NgIf, isPlatformBrowser } from '@angular/common';
import {
  Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel,
  NavigationError,
  Event
} from '@angular/router';
import { ThemeService } from './shared/services/theme/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { AppModule } from './app.module';
import { LangService } from './shared/services/lang/lang.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AppModule, MatProgressSpinnerModule, NgIf],
  styleUrl: "./app.component.css",
  providers: [LangService, TranslateService],
  templateUrl: './app.component.html',
})
export class AppComponent {
  darkMode: boolean = false;
  showLoadingIndicator = true;


  constructor(private langService: LangService, private theme: ThemeService, @Inject(PLATFORM_ID) platformId: Object, private translateService: TranslateService, private router: Router) {
    if (isPlatformBrowser(platformId)) {
      this.theme.darkMode$.next(JSON.parse(localStorage.getItem('theme') || 'false'))
      this.theme.darkMode$.subscribe(val => this.darkMode = val)
      this.translateService.addLangs(['uz', 'en'])
      this.translateService.setDefaultLang(localStorage.getItem('lang') || 'uz')
      this.langService.changeLang(localStorage.getItem('lang') || 'uz')
    }

    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true
      }
      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false
      }
      if (routerEvent instanceof NavigationError) {
        this.showLoadingIndicator = false
      }
      if (routerEvent instanceof NavigationCancel) {
        this.showLoadingIndicator = false
      }
    });
  }

  @HostBinding('class.dark') get mode() {
    return this.darkMode
  }
}
