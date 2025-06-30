import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdvertisementComponent } from '../../components/advertisement/advertisement.component';
import { MovieRatingComponent } from '../../components/movie-rating/movie-rating.component';
import { ArticleHeaderComponent } from '../../components/article-header/article-header.component';
import { ApiService } from '../../core/services/api.service';
import { Queries } from '../../core/querys/queries';
import { forkJoin } from 'rxjs';
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

  loadData(): void {
    const sql = Queries.publicacao.selectAll;
    const sqlUser  = Queries.usuario.selectUser; //SELECT * FROM usuario where usuario_id = 
    const sqlCategory  = Queries.categoria.selectCategory; //`SELECT * FROM categoria where categoria_id = `,

    this.endpoint.query<any[]>(sql).subscribe({
      next: (resPublic) => {
        this.data = resPublic;
        console.log('publicacoes:', this.data);

        const primeira = this.data[0];

        const usuarioId = primeira.usuario_id;
        const categoriaId = primeira.categoria_id;

        forkJoin({
          usuario: this.endpoint.query(sqlUser + `'${usuarioId}'`),
          categoria: this.endpoint.query(sqlCategory + `'${categoriaId}'`),
        }).subscribe({
            next: (res) => {
          console.log('Usuário:', res.usuario);
          console.log('Categoria:', res.categoria);
        },
        error: (err) => {
          console.error('Erro ao carregar usuário ou categoria:', err);
        }
        });
      }, error: (err) => {
      console.error('Erro ao carregar publicações:', err);
    }
    });
  }

}
