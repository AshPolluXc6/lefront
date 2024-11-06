import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminComponent } from "./admin/admin.component";
import { ClientHomeComponent } from "./client/client-home/client-home.component";
import { RateStarsComponent } from '../../projects/clib/src/lib';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminComponent, ClientHomeComponent, RateStarsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'leparler';
}
