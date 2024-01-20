import { HostBinding, Injectable, OnInit, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnInit {
  darkMode: boolean = false

  darkMode$ = new BehaviorSubject<boolean>(this.darkMode)
  constructor() {
  }

  ngOnInit(): void {
    this.darkMode = JSON.parse(localStorage.getItem('theme') || 'false')
    this.darkMode$.next(this.darkMode)
  }

  changeMode(val: any) {
    localStorage.setItem('theme', val)
    this.darkMode$.next(val)
  }
}
