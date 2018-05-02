import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lang: string;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fr');
    this.lang = localStorage.getItem('lang') || 'fr';
    this.translate.use(this.lang);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.lang = language;
    localStorage.setItem('lang', language);
  }

}
