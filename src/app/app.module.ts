import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/',)
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule, TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]
      }
    }),
  ],
  exports: [TranslatePipe]
})
export class AppModule { }
