
export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  hashtags: string[];
  categoryId: string;
  createdAt: number;
  published: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export type View = 'home' | 'category' | 'tag' | 'admin' | 'post-detail';

export interface AppState {
  posts: Post[];
  categories: Category[];
  currentView: View;
  selectedCategoryId?: string;
  selectedTag?: string;
  selectedPostId?: string;
}
