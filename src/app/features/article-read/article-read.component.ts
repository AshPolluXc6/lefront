import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdvertisementComponent } from '../../components/advertisement/advertisement.component';
import { MovieRatingComponent } from '../../components/movie-rating/movie-rating.component';
import { ArticleHeaderComponent } from '../../components/article-header/article-header.component';
import { ApiService } from '../../core/services/api.service';
import { Queries } from '../../core/querys/queries';
import { forkJoin, map } from 'rxjs';
// import { ArticleData } from '../../core/models/articleData.model';

@Component({
  selector: 'app-article-read',
  imports: [CommonModule, AdvertisementComponent,MovieRatingComponent,ArticleHeaderComponent],
  templateUrl: './article-read.component.html',
  styleUrl: './article-read.component.scss'
})
export class ArticleReadComponent implements OnInit{
  data: any[] = [];
  user: any[] = [];
  category: any[] = [];


  constructor(
    private endpoint: ApiService,
  ){}
  

  ngOnInit(){
    this.loadData();
  }

  getTextoFormatado(texto: string): string {
  return texto.replace(/&nbsp;/g, ' ');
  }

  loadData(): void {
  const sql = Queries.publicacao.selectAll;
  const sqlUser = Queries.usuario.selectUser; // ex: SELECT * FROM usuario WHERE usuario_id =
  const sqlCategory = Queries.categoria.selectCategory; // ex: SELECT * FROM categoria WHERE categoria_id =

  this.endpoint.query<any[]>(sql).subscribe({
    next: (resPublic) => {
      const dataWithRequests = resPublic.map((item) => {
        const usuarioObs = this.endpoint.query<any>(sqlUser + `'${item.usuario_id}'`);
        const categoriaObs = this.endpoint.query<any>(sqlCategory + `'${item.categoria_id}'`);

        return forkJoin({ usuario: usuarioObs, categoria: categoriaObs }).pipe(
          map((res) => ({
            ...item,
            usuario: res.usuario[0], // ou res.usuario se vier direto
            categoria: res.categoria[0], // idem
          }))
        );
      });

      forkJoin(dataWithRequests).subscribe({
        next: (result) => {
          this.data = result;
          console.log('Publicações com usuário e categoria:', this.data);
        },
        error: (err) => {
          console.error('Erro ao carregar dados:', err);
        }
      });
    },
    error: (err) => {
      console.error('Erro ao carregar publicações:', err);
    }
  });
  }

}
