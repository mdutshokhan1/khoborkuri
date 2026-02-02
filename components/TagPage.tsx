
import React from 'react';
import { Post, Category } from '../types';
import PostCard from './PostCard';

interface TagPageProps {
  tag: string;
  posts: Post[];
  categories: Category[];
  onPostClick: (id: string) => void;
}

const TagPage: React.FC<TagPageProps> = ({ tag, posts, categories, onPostClick }) => {
  return (
    <div>
      <div className="border-b border-gray-200 pb-8 mb-12 flex items-center gap-4">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 news-title">#{tag}</h1>
          <p className="text-gray-500">Discovering stories tagged with {tag}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            categoryName={categories.find(c => c.id === post.categoryId)?.name}
            onPostClick={onPostClick}
            onTagClick={() => {}} // Already on the tag page
          />
        ))}
      </div>
    </div>
  );
};

export default TagPage;
