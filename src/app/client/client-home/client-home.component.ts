import { Component, inject, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { RateStarsComponent } from '../../../../projects/clib/src/lib';
import { NewsComponent } from '../../../../projects/clib/src/lib/news/news.component';
import { FrameComponent } from "../../../../projects/clib/src/lib/frame/frame.component";
import { ConnectionService } from '../../services/connection.service';
import { AnswerStandard } from '../../services/answerstandard.service';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { MovieShowcaseComponent } from '../../components/movie-showcase/movie-showcase.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { LoginComponent } from '../../components/login/login.component';
import { ApiService } from '../../core/services/api.service';
import { Queries } from '../../core/querys/queries';

@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [
    RateStarsComponent, 
    NewsComponent, 
    FrameComponent, 
    NewsCardComponent, 
    MovieShowcaseComponent, 
    SliderComponent, 
    NgClass, 
    ReviewCardComponent,
    SearchBarComponent,
    CommonModule,
    RouterModule,
    LoginComponent,
   ],
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss'],
})
export class ClientHomeComponent implements OnInit {
  
  @ViewChild(SliderComponent) sliderComponent!: SliderComponent;
  onMouseEnter() {
      this.sliderComponent.stopAutoSlide();
    }
    onMouseLeave() {
      this.sliderComponent.startAutoSlide();
    }


  constructor(
    private apiservice: ApiService, 
  ){}
    
  private endpoint = inject(ConnectionService);

  data: any[] = [];
  dataDestaques: any[] = [];
  currentIndex: number = 0;
  
  isSliding: boolean = true;

  categorias = ['Filmes', 'Series', 'Jogos'];
  categoriaAtiva = 'Filmes';

  reviewDate1 = new Date(2023, 10, 15);
  reviewDate2 = new Date(2023, 11, 5);
  reviewDate3 = new Date(2024, 0, 20);
  isScrolled = false;

  searchResults: string[] = [];
  lastSearchTerm: string = '';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    const sql = Queries.publicacao.selectAll;

    this.apiservice.query<any[]>(sql).subscribe({
      next:(res) => {
        this.data= res;
        console.log(res);
        console.log(this.data);
      },
       error: (err) => {
        console.error(err);
      }
    });
  }

  get imagens(): { src: string; alt?: string }[] {
    return this.data.map(item => ({
      src: item.imagemcapa,
      alt: item.nome 
    }));
  } 

  handleSearch(term:string){
    this.lastSearchTerm = term;

    this.searchResults = [
      `Result 1 for "${term}"`,
      `Result 2 for "${term}"`,
      `Result 3 for "${term}"`
    ];
  }

  selecionarCategoria(categoria: string) {
    this.categoriaAtiva = categoria;

    // Aqui você pode chamar um método para atualizar os banners:
    this.filtrarBannersPorCategoria(categoria);
  }

  filtrarBannersPorCategoria(categoria: string) {
    console.log('Filtrando banners para:', categoria);
    // Lógica de filtragem ou chamada de serviço
  }

  // LoadData() {
  // }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
  
}
