
import React from 'react';
import { Post, Category } from '../types';
import PostCard from './PostCard';

interface NewsFeedProps {
  posts: Post[];
  categories: Category[];
  onPostClick: (id: string) => void;
  onTagClick: (tag: string) => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ posts, categories, onPostClick, onTagClick }) => {
  const latestPosts = [...posts].sort((a, b) => b.createdAt - a.createdAt);
  const heroPost = latestPosts[0];
  const gridPosts = latestPosts.slice(1);

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-400">No news posted yet. Check back later!</h2>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      {heroPost && (
        <section className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-900 aspect-[16/9] lg:aspect-[21/9]">
          {heroPost.imageUrl && (
            <img 
              src={heroPost.imageUrl} 
              alt={heroPost.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-0 p-6 sm:p-12 w-full lg:w-3/4">
            <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block">
              LATEST HEADLINE
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-bold text-white news-title cursor-pointer hover:underline mb-4"
              onClick={() => onPostClick(heroPost.id)}
            >
              {heroPost.title}
            </h2>
            <p className="text-gray-200 text-lg hidden sm:block line-clamp-2 mb-6">
              {heroPost.content}
            </p>
            <button 
              onClick={() => onPostClick(heroPost.id)}
              className="bg-white text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Read Full Story
            </button>
          </div>
        </section>
      )}

      {/* Grid Section */}
      <section>
        <div className="flex items-center justify-between border-b-2 border-gray-900 mb-8 pb-2">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight">Recent Updates</h2>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-xs font-bold text-gray-500">LIVE</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              categoryName={categories.find(c => c.id === post.categoryId)?.name}
              onPostClick={onPostClick}
              onTagClick={onTagClick}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsFeed;
