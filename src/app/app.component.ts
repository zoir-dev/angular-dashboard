import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { TranslateService } from '@ngx-translate/core';
import { TestComponent } from './test/test.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppModule, TestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';

  constructor(private translate: TranslateService,) {
    this.translate.setDefaultLang('uz')
  }

  changeLang(val: string) {
    this.translate.use(val)
  }
}
