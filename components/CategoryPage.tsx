
import React from 'react';
import { Post, Category } from '../types';
import PostCard from './PostCard';

interface CategoryPageProps {
  category: Category;
  posts: Post[];
  onPostClick: (id: string) => void;
  onTagClick: (tag: string) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, posts, onPostClick, onTagClick }) => {
  return (
    <div>
      <div className="border-b border-gray-200 pb-8 mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 news-title">{category.name}</h1>
        <p className="mt-2 text-gray-500">Showing all recent updates in {category.name}</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg italic">No articles found in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              categoryName={category.name}
              onPostClick={onPostClick}
              onTagClick={onTagClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
