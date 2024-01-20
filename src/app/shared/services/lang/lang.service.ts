// translation.service.ts
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  lang$ = new BehaviorSubject<string>('en');
  isBrowser!: boolean

  constructor(private translateService: TranslateService, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId)
    if (this.isBrowser) {
      let langg
      langg = localStorage.getItem('lang')
      if (langg === 'null' || langg === null) {
        this.lang$.next('uz')
      } else {
        this.lang$.next(langg)
      }
    }
  }

  changeLang(language: string) {
    if (this.isBrowser) {
      this.translateService.use(language);
      localStorage.setItem('lang', language)
      this.lang$.next(language);
    }
  }

  getLanguage(): string {
    return this.translateService.currentLang || 'uz';
  }
}
