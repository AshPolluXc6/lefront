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
  styleUrls: ['./client-home.component.scss'],
})
export class ClientHomeComponent {
  private endpoint = inject(ConnectionService);

  publi: any[] = [];
  publiDestaques: any[] = [];
  currentIndex: number = 0;

  ngOnInit(): void {
    this.LoadData();
  }

  LoadData() {
    this.endpoint.getPublicacao().subscribe((resp: AnswerStandard) => {
      if (resp.success === 1) {
        this.publi = resp.data.publicacao;

        // Filtrar somente as publicações de destaque
        this.publiDestaques = this.publi.filter(
          (item: any) => item.flagdestaque === 1
        );

        // Garantir que o índice inicial seja o primeiro destaque
        this.currentIndex = 0;
      }
    });
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
  
}
