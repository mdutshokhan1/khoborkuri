
import React from 'react';
import { Post, Category } from '../types';

interface PostDetailProps {
  post: Post;
  category: Category;
  onTagClick: (tag: string) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, category, onTagClick }) => {
  if (!post) return <div className="text-center py-20">Post not found.</div>;

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8 text-center">
        <div className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">
          {category?.name || 'News'}
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 news-title mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center text-gray-500 text-sm">
          <span>By Khoborkuri Editorial</span>
          <span className="mx-3">•</span>
          <span>{new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
        </div>
      </header>

      {post.videoUrl ? (
        <div className="mb-10 aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
          <iframe
            src={post.videoUrl.replace('watch?v=', 'embed/')}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : post.imageUrl ? (
        <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
          <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover" />
        </div>
      ) : null}

      <div className="prose prose-lg max-w-none text-gray-800 mb-12 leading-relaxed">
        {post.content.split('\n').map((para, idx) => (
          <p key={idx} className="mb-6">{para}</p>
        ))}
      </div>

      <footer className="border-t border-gray-200 pt-8 mt-12">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-gray-500 font-bold uppercase text-xs">Topics:</span>
          {post.hashtags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      </footer>
    </article>
  );
};

export default PostDetail;
