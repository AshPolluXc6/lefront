import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminComponent } from "./admin/admin.component";
import { ClientHomeComponent } from "./client/client-home/client-home.component";
import { RateStarsComponent } from '../../projects/clib/src/lib';
import { TranslateService } from '@ngx-translate/core';




@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private translate: TranslateService) {
  this.translate.setDefaultLang('pt');
  this.translate.use('pt'); 
}
  title = 'leparler';
}
