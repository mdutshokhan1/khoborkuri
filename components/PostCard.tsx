
import React from 'react';
import { Post, Category } from '../types';

interface PostCardProps {
  post: Post;
  categoryName?: string;
  onPostClick: (id: string) => void;
  onTagClick: (tag: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, categoryName, onPostClick, onTagClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {post.imageUrl && (
        <div 
          className="relative h-48 w-full cursor-pointer" 
          onClick={() => onPostClick(post.id)}
        >
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          {post.videoUrl && (
            <div className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
        </div>
      )}
      <div className="p-5 flex-grow">
        <div className="flex items-center text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">
          {categoryName || 'Uncategorized'}
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <h3 
          className="text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-red-600 transition-colors line-clamp-2"
          onClick={() => onPostClick(post.id)}
        >
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.content}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {post.hashtags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
