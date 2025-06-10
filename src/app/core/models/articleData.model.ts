export interface ArticleData {
  id?: string;
  title: string;
  subtitle: string;
  category: string;
  content: string; //texto
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  publishDate: string;
  readTime: number;
  tags: string[];
  featuredImage: string;
  imagem?:string;
  flagRated:boolean;
  movieRating?: {
    overallScore: number;
    criteria: Array<{ name: string; score: number }>;
  };
  status: 'draft' | 'published' | 'scheduled';
  scheduledDate?: string;
}