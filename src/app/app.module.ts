import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const HttpLoadFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json')
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule, HttpClientModule, TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoadFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslatePipe, TranslateModule],
  providers: [TranslateModule, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class AppModule { }
