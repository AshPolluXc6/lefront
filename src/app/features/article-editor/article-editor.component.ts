import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ArticleData } from '../../core/models/articleData.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AbasService } from '../../core/services/sessionStorage.service';


@Component({
  selector: 'app-article-editor',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, QuillModule],
  templateUrl: './article-editor.component.html',
  styleUrl: './article-editor.component.scss',
})
export class ArticleEditorComponent {
  @Input() articleData?: ArticleData;
  @Input() isEditMode: boolean = false;
  @Output() onSave = new EventEmitter<ArticleData>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onPublish = new EventEmitter<ArticleData>();

  articleForm!: FormGroup;
  showMovieRating: boolean = false;
  newTag: string = '';
  tags: string[] = [];

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
    private abasService: AbasService
  ) {}

ngOnInit() {
  this.initializeForm();
  
  const id = this.route.snapshot.paramMap.get('id');
  this.isEditMode = id !== null && id !== 'novo' && !id.startsWith('novo-');
  
  // Obter dados da aba atual
  const aba = this.abasService.getAbaPorLink(this.router.url);
  
  if (aba?.dados) {
    this.loadArticleData(aba.dados);
  } else if (this.isEditMode && id) {
    this.carregarArtigo(Number(id));
  } else {
    this.inicializarNovoArtigo();
  }
  }
   inicializarNovoArtigo(): void {
    // Inicializa o formulário com valores padrão para um novo artigo
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
    
    // Limpa dados adicionais
    this.tags = [];
    this.showMovieRating = false;
    
    // Limpa critérios de avaliação
    while (this.ratingCriteriaArray.length > 0) {
      this.ratingCriteriaArray.removeAt(0);
    }
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
      scheduledDate: ['']
    });
  }

  get ratingCriteriaArray() {
    return this.articleForm.get('ratingCriteria') as any;
  }

  loadArticleData(articleData: ArticleData) {
    this.articleForm.patchValue(articleData);
    this.tags = articleData.tags || [];
    this.showMovieRating = !!articleData.movieRating;
    
    if (articleData.movieRating?.criteria) {
      // Limpa critérios existentes
      while (this.ratingCriteriaArray.length) {
        this.ratingCriteriaArray.removeAt(0);
      }
      
      // Adiciona novos critérios
      articleData.movieRating.criteria.forEach(criterion => {
        this.addCriterion(criterion);
      });
    }
  }

  carregarArtigo(id: number) {
    // Implemente sua lógica para buscar do servidor
    // Exemplo:
    /*
    this.api.getArtigo(id).subscribe(artigo => {
      this.loadArticleData(artigo);
    });
    */
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
    if (this.newTag.trim() && !this.tags.includes(this.newTag.trim())) {
      this.tags.push(this.newTag.trim());
      this.newTag = '';
    }
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
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
    if (this.articleForm.valid) {
      const articleData = this.buildArticleData();
      articleData.status = 'draft';
      this.onSave.emit(articleData);
    }
  }

  publishArticle() {
    if (this.articleForm.valid) {
      const articleData = this.buildArticleData();
      if (articleData.status === 'draft') {
        articleData.status = 'published';
      }
      this.onPublish.emit(articleData);
    }
  }

  buildArticleData(): ArticleData {
    const formValue = this.articleForm.value;
    const articleData: ArticleData = {
      ...formValue,
      tags: this.tags,
      id: this.articleData?.id
    };

    if (this.showMovieRating) {
      articleData.movieRating = {
        overallScore: formValue.overallScore,
        criteria: formValue.ratingCriteria
      };
    }

    return articleData;
  }

  onCancelClick() {
    this.onCancel.emit();
  }
  
cancel() {
  this.onCancel.emit();
}
}
