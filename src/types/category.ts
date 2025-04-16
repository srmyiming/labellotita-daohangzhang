export interface Category {
  id: string;
  name: string;
  created_at: string;
}

export interface CategoryWithCount extends Category {
  manufacturer_count: number;
} 