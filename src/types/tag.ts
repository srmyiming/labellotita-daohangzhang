export interface Tag {
  id: string;
  name: string;
  created_at: string;
}

export interface TagWithCount extends Tag {
  manufacturer_count: number;
} 