import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ArticleData } from '../../core/models/articleData.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AbasService } from '../../core/services/sessionStorage.service';
import { debounceTime } from 'rxjs/operators';


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
    
    const aba = this.abasService.getAbaPorLink(this.router.url);
    
    if (aba?.dados) {
      this.loadArticleData(aba.dados);
    } else if (this.isEditMode && id) {
      this.carregarArtigo(Number(id));
    } else {
      this.inicializarNovoArtigo();
    }

    const draft = this.abasService.getDadosAbaAtual<ArticleData>();
    if (draft) {
      this.articleForm.patchValue(draft);
    }

  // Escuta mudanças no form e salva no sessionStorage
  this.articleForm.valueChanges
    .pipe(debounceTime(300)) // Espera 300ms sem mudanças
    .subscribe((val: Partial<ArticleData>) => {
      this.abasService.salvarRascunhoAtual<ArticleData>({
        ...val,
        status: 'draft', // força o status como rascunho
      });
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
      scheduledDate: ['']
    });
  }

  get ratingCriteriaArray() {
    return this.articleForm.get('ratingCriteria') as any;
  }

  loadArticleData(articleData: ArticleData) {

    this.articleForm.patchValue(articleData);
    this.tags = articleData.tags || [];
    // this.showMovieRating = !!articleData.movieRating;
    this.showMovieRating = articleData.flagRated;
    
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

  

  
  cancel() {
    this.onCancel.emit();
  }


}
