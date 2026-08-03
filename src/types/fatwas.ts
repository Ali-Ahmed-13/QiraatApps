export interface CategoryItem {
  id: string;
  label: string;
}

export interface Fatwa {
  id: string;
  question?: string;
  category?: string;
  answer?: string;
  reference?: string;
}

export interface FatwasData {
  categories: CategoryItem[];
  fatwas: Fatwa[];
}
