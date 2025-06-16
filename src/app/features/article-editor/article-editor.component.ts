import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ArticleData } from '../../core/models/articleData.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AbasService } from '../../core/services/sessionStorage.service';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from '../../core/services/api.service';
import { Queries } from '../../core/querys/queries';


@Component({
  selector: 'app-article-editor',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, QuillModule],
  templateUrl: './article-editor.component.html',
  styleUrl: './article-editor.component.scss',
})
export class ArticleEditorComponent implements OnInit {
  @Input() articleData?: ArticleData;
  @Input() isEditMode: boolean = false;
  @Output() onSave = new EventEmitter<ArticleData>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onPublish = new EventEmitter<ArticleData>();

  articleForm!: FormGroup;
  showMovieRating: boolean = false;
  newTag: string = '';
  tags: string[] = [];
  category: any[] = [];

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 1 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video']
    ]
  };

  quillStyles = {
    height: '400px'
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private abasService: AbasService,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef 
  ) {}
  

  loadData(): void {
  const sql = Queries.categoria.selectAll;

  this.apiService.query<{ id: number; nome: string }[]>(sql).subscribe({
    next: (res) => {
      this.category = res;
      console.log('Categorias:', res);

      // 🔁 Se você já tem dados carregados no form, aplique categoria de novo
      const draft = this.abasService.getDadosAbaAtual<ArticleData>();
      if (draft?.category) {
        this.articleForm.patchValue({ categoria: draft.category });
      }
    }
  });
}
  // ngOnInit() {
  //   this.initializeForm();
  //   this.loadData();
    
  //   // Inicializa o modo de edição
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.isEditMode = id !== null && id !== 'novo' && !id.startsWith('novo-');
  // }

  // ngAfterViewInit() {
  //   // Carrega dados após a view ser inicializada
  //   setTimeout(() => {
  //     const aba = this.abasService.getAbaPorLink(this.router.url);
      
  //     if (aba?.dados) {
  //       this.loadArticleData(aba.dados);
  //     } else if (this.isEditMode && this.route.snapshot.paramMap.get('id')) {
  //       const id = this.route.snapshot.paramMap.get('id');
  //       this.carregarArtigo(Number(id));
  //     } else {
  //       this.inicializarNovoArtigo();
  //     }

  //     // Configura observadores após carga inicial
  //     this.setupObservers();
  //   });
  // }
  //  setupObservers() {
  //   // Observador para salvar rascunho
  //   this.articleForm.valueChanges
  //     .pipe(debounceTime(300))
  //     .subscribe(() => {
  //       const draftData = this.buildArticleData();
  //       draftData.status = 'draft';
  //       this.abasService.salvarRascunhoAtual<ArticleData>(draftData);
  //     });

  //   // Observador para avaliação de filme
  //   this.articleForm.get('flagRated')!.valueChanges
  //     .subscribe(val => {
  //       this.showMovieRating = val;
  //       if (!val) {
  //         this.ratingCriteriaArray.clear();
  //         this.articleForm.get('overallScore')!.setValue(0);
  //       }
  //     }); 
  // }

  ngOnInit() {
    this.initializeForm();
    this.loadData();
     
    
    this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    this.isEditMode = id !== null && id !== 'novo' && !id.startsWith('novo-');
    
    // Carregue dados aqui diretamente
    if (this.isEditMode && id) {
      this.carregarArtigo(Number(id));
    } else {
      this.inicializarNovoArtigo();
    }
    });
    setTimeout(() => {
      const draft = this.abasService.getDadosAbaAtual<ArticleData>();
      if (draft) {
        this.articleForm.patchValue(draft);
      }
    });

    // Escuta mudanças no form e salva no sessionStorage
    this.articleForm.valueChanges
    .pipe(debounceTime(300))
    .subscribe(() => {
      // Reconstrói o ArticleData completo, incluindo movieRating quando aplicável
      const draftData = this.buildArticleData();
      draftData.status = 'draft';
      this.abasService.salvarRascunhoAtual<ArticleData>(draftData);
    });

    this.articleForm.get('flagRated')!.valueChanges
    .subscribe(val => {
    this.showMovieRating = val;
    // Opcional: se for false, limpar critérios e overallScore?
    if (!val) {
      // limpa ratingCriteria e zera overallScore, se fizer sentido:
      this.ratingCriteriaArray.clear();
      this.articleForm.get('overallScore')!.setValue(0);
    }
    }); 
  }
  
  ngAfterViewInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isEditMode = id !== null && id !== 'novo' && !id.startsWith('novo-');
       
      const aba = this.abasService.getAbaPorLink(this.router.url);
      
      if (aba?.dados) {
        this.loadArticleData(aba.dados);
      } else if (this.isEditMode && id) {
        this.carregarArtigo(Number(id));
      }
    });
  }


  inicializarNovoArtigo(): void {
    this.articleForm.patchValue({
      title: '',
      subtitle: '',
      category: '',
      content: '',
      authorName: '',
      authorTitle: '',
      authorAvatar: '',
      publishDate: this.getCurrentDate(),
      readTime: 5,
      featuredImage: '',
      overallScore: 0,
      status: 'draft',
      scheduledDate: ''
    });
    
    this.tags = [];
    this.showMovieRating = false;
  
    while (this.ratingCriteriaArray.length > 0) {
      this.ratingCriteriaArray.removeAt(0);
    }
  }



  initializeForm() {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      category: ['', Validators.required],
      content: ['', Validators.required],
      authorName: ['', Validators.required],
      authorTitle: [''],
      authorAvatar: [''],
      publishDate: [this.getCurrentDate()],
      readTime: [5],
      featuredImage: [''],
      overallScore: [0],
      ratingCriteria: this.fb.array([]),
      status: ['draft'],
      tags: this.fb.array([]),
      scheduledDate: [''],
      flagRated: [false]
    });
  }

  get ratingCriteriaArray() {
    return this.articleForm.get('ratingCriteria') as any;
  }
  get tagsArray() {
  return this.articleForm.get('tags') as FormArray;
  }
  
  loadArticleData(articleData: ArticleData) {
    this.articleForm.patchValue({
      ...articleData,
      tags: [],
      flagRated: articleData.flagRated ?? false,
      overallScore: articleData.movieRating?.overallScore ?? 0 });

    this.tags = articleData.tags || [];
    // this.showMovieRating = !!articleData.movieRating;
    this.showMovieRating = articleData.flagRated;
    const tagsArray = this.articleForm.get('tags') as FormArray;
    tagsArray.clear();

    if(articleData.tags && articleData.tags.length) {articleData.tags.forEach(tag => {tagsArray.push(new FormControl(tag));});}
    
    // rating logica 
    this.ratingCriteriaArray.clear();

    if (articleData.movieRating?.criteria?.length) {
    articleData.movieRating.criteria.forEach(criterion => {
      this.addCriterion(criterion);
      });
    }
  }

  carregarArtigo(id: number) {
    // implementar logica para buscar do servidor dpeois.
  }

  getCurrentDate(): string {
    const now = new Date();
    return now.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  addTag() {
  const tagValue = this.newTag.trim();
  if (tagValue && !this.tagsArray.value.includes(tagValue)) {
    this.tagsArray.push(new FormControl(tagValue));
    this.newTag = '';
  }
  }

  removeTag(index: number) {
  this.tagsArray.removeAt(index);
  }

  addCriterion(criterion?: { name: string; score: number }) {
    const criterionGroup = this.fb.group({
      name: [criterion?.name || '', Validators.required],
      score: [criterion?.score || 0, [Validators.required, Validators.min(0), Validators.max(10)]]
    });
    this.ratingCriteriaArray.push(criterionGroup);
  }

  removeCriterion(index: number) {
    this.ratingCriteriaArray.removeAt(index);
  }

  saveDraft() {
  if (this.articleForm.invalid) return;

  const data = this.buildArticleData();
  data.status = 'draft'; // isso será usado para setar o `flagrascunho = 1` no backend

  this.apiService.post('/publicacao', data).subscribe({
    next: (res) => {
      console.log('Rascunho salvo:', res);
    },
    error: (err) => {
      console.error('Erro ao salvar rascunho:', err);
    }
  });
}

  publishArticle() {
    if (this.articleForm.invalid) return;

    const formData = this.articleForm.value;

    const publicacao = {
      nome: formData.titulo,
      fichatecnica: formData.fichatecnica,
      imagemcapa: formData.imagemCapa,
      imagem: formData.imagem,
      texto: formData.texto,
      usuario_id: '', // supondo que você tenha isso salvo
      flagfinalizada: true,
      flagautorizada: false,
      flagrascunho: false,
      flagexcluido: false,
      datacadastro: new Date().toISOString(),
      dataalterado: new Date().toISOString(),
      categoria_id: formData.categoriaId,
      flagdestaque: formData.flagdestaque ?? false,
      flagcritica: formData.flagcritica ?? false,
      flagnoticia: formData.flagnoticia ?? false,
      nota: formData.nota ?? null
    };

    this.apiService.post('/publicacao', publicacao).subscribe({
      next: (res) => {
        console.log('Publicado com sucesso', res);
        // feedback para usuário, redirecionamento etc.
      },
      error: (err) => {
        console.error('Erro ao publicar', err);
      }
    });
  }

  buildArticleData(): ArticleData {
  const formValue = this.articleForm.value;
  const articleData: ArticleData = {
    ...formValue,
    tags: this.tagsArray.value,
    id: this.articleData?.id,
    flagRated: formValue.flagRated
  };

  if (formValue.flagRated) {
    articleData.movieRating = {
      overallScore: formValue.overallScore,
      criteria: this.ratingCriteriaArray.value
    };
  } else {
    delete articleData.movieRating;
  }

  return articleData;
}

trackByCategoria(index: number, item: { categoria_id: any; nome: string }) {
  return item.categoria_id;
}

  
  cancel() {
    this.onCancel.emit();
  }


}
