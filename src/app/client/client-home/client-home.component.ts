import { Component, inject } from '@angular/core';
import { RateStarsComponent } from '../../../../projects/clib/src/lib';
import { NewsComponent } from '../../../../projects/clib/src/lib/news/news.component';
import { FrameComponent } from "../../../../projects/clib/src/lib/frame/frame.component";
import { ConnectionService } from '../../services/connection.service';
import { AnswerStandard } from '../../services/answerstandard.service';



@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [RateStarsComponent, NewsComponent, FrameComponent],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss'
})
export class ClientHomeComponent {

private endpoint = inject(ConnectionService);

publi: any[] = [];

ngOnInit(): void {
  this.LoadData();
}

LoadData() {
  this.endpoint.getPublicacao().subscribe(
    (resp: AnswerStandard) =>{
      if(resp.success === 1) {
        this.publi = resp.data.publicacao;
        console.log(this.publi);
      }
    }
  )
}


}
