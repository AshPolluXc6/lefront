import { Component, inject, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { ConnectionService } from '../../services/connection.service';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { MovieShowcaseComponent } from '../../components/movie-showcase/movie-showcase.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ApiService } from '../../core/services/api.service';
import { Queries } from '../../core/querys/queries';


@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [
    NewsCardComponent, 
    MovieShowcaseComponent, 
    SliderComponent, 
    NgClass, 
    ReviewCardComponent,
    SearchBarComponent,
    CommonModule,
    RouterModule,
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
  dataMS: any[] = [];
  dataSlider: any[] = [];
  dataRWCard: any[] = [];
  dataNews: any[] = [];

  dataDestaques: any[] = [];
  currentIndex: number = 0;

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
    // this.loadData2();
  }
  
  // loadData(): void {
  //   const sql = Queries.publicacao.selectAll;

  //   this.apiservice.query<any[]>(sql).subscribe({
  //     next:(res) => {
  //       this.data= res;
  //       console.log(res);
  //       console.log(this.data);
  //     },
  //      error: (err) => {
  //       console.error(err);
  //     }
  //   });
  // }

  loadData(): void {
  const sql = Queries.publicacao.selectAll;

  this.apiservice.query<any[]>(sql).subscribe({
    next: (res) => {
      this.data = res;
      this.dataMS = this.mapToMovieShowcase(res);
      this.dataSlider = this.mapToSlider(res);
      this.dataNews = this.mapToNews(res);
      if(res.some(item => item.flagcritica === 1)) {
      this.dataRWCard = this.mapToRWCard(res);
      }

      console.log('Dados carregados:', res);
    },
    error: (err) => console.error('Erro ao carregar:', err)
    }); 
  }

private mapToMovieShowcase(data: any[]): any[] {
  return data.map(item => ({
    title: item.nome,
    image: item.imagemcapa,
    rating: item.nota,
    duration: item.datacadastro,
    category: item.publicacao_id
  }));
}

private mapToSlider(data: any[]): any[] {
  return data.map(item => ({
    src: item.imagemcapa,
    alt: item.nome
  }))
}
private mapToRWCard(data: any[]): any[] {
  return data.map(item => ({
      title: item.nome,
      image: item.imagemcapa,
      rating: item.nota,
      duration: item.duracao, 
      category: item.categoria,
      flagcritica: item.flagcritica
  }))
}
private mapToNews(data: any[]): any[] {
  return data.map(item => ({
      title: item.nome,
      image: item.imagemcapa,
      category: item.publicacao_id,
      date: item.dataalterado,
      readtime: item.readtime, 
      description: item.nome
  }))
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
