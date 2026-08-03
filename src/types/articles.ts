export interface Article {
  id: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  date?: string;
  readTime?: string;
  featured?: boolean;
  tags?: string[];
}

export interface CategoryItem {
  id: string;
  label: string;
}

export interface ArticlesData {
  categories: CategoryItem[];
  articles: Article[];
}
