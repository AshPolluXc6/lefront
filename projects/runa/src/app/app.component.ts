import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardCriticsComponent } from "../../../clib/src/lib/card-critics/card-critics.component";
import { RateStarsComponent } from "../../../clib/src/lib/rate-stars/rate-stars.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CardCriticsComponent, RateStarsComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Runa';
}
