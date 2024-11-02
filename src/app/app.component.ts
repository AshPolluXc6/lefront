import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminComponent } from "./admin/admin.component";
import { ClientHomeComponent } from "./client/client-home/client-home.component";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminComponent, ClientHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'leparler';
}
