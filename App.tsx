
import React, { useState, useEffect, useCallback } from 'react';
import { Post, Category, View, AppState } from './types';
import Navbar from './components/Navbar';
import NewsFeed from './components/NewsFeed';
import CategoryPage from './components/CategoryPage';
import TagPage from './components/TagPage';
import AdminPanel from './components/AdminPanel';
import PostDetail from './components/PostDetail';
import Footer from './components/Footer';

const STORAGE_KEY = 'khoborkuri_data';

const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'General News', slug: 'news' },
  { id: '2', name: 'Today’s News', slug: 'today' },
  { id: '3', name: 'Cyclone News', slug: 'cyclone' },
  { id: '4', name: 'Election News', slug: 'election' }
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    title: 'Welcome to Khoborkuri: Your Trusted News Partner',
    content: 'We are thrilled to launch our digital news platform catering to the most pressing news of today. Our team is dedicated to providing real-time updates on politics, environment, and social issues.',
    imageUrl: 'https://picsum.photos/seed/news1/800/450',
    hashtags: ['BreakingNews', 'Khoborkuri', 'Launch'],
    categoryId: '1',
    createdAt: Date.now(),
    published: true
  }
];

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        currentView: 'home'
      };
    }
    return {
      posts: INITIAL_POSTS,
      categories: INITIAL_CATEGORIES,
      currentView: 'home'
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const navigateTo = (view: View, params?: { categoryId?: string; tag?: string; postId?: string }) => {
    setState(prev => ({
      ...prev,
      currentView: view,
      selectedCategoryId: params?.categoryId,
      selectedTag: params?.tag,
      selectedPostId: params?.postId
    }));
    window.scrollTo(0, 0);
  };

  const addPost = (post: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    setState(prev => ({
      ...prev,
      posts: [newPost, ...prev.posts]
    }));
  };

  const updatePost = (postId: string, updates: Partial<Post>) => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.map(p => p.id === postId ? { ...p, ...updates } : p)
    }));
  };

  const deletePost = (postId: string) => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.filter(p => p.id !== postId)
    }));
  };

  const addCategory = (name: string) => {
    const newCat: Category = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-')
    };
    setState(prev => ({
      ...prev,
      categories: [...prev.categories, newCat]
    }));
  };

  const deleteCategory = (catId: string) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== catId),
      // Move posts to General News or 'uncategorized'
      posts: prev.posts.map(p => p.categoryId === catId ? { ...p, categoryId: '1' } : p)
    }));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar 
        categories={state.categories} 
        onNavigate={navigateTo} 
        currentView={state.currentView}
        selectedCategoryId={state.selectedCategoryId}
      />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {state.currentView === 'home' && (
          <NewsFeed 
            posts={state.posts.filter(p => p.published)} 
            categories={state.categories}
            onPostClick={(id) => navigateTo('post-detail', { postId: id })}
            onTagClick={(tag) => navigateTo('tag', { tag })}
          />
        )}
        
        {state.currentView === 'category' && (
          <CategoryPage 
            category={state.categories.find(c => c.id === state.selectedCategoryId)!}
            posts={state.posts.filter(p => p.categoryId === state.selectedCategoryId && p.published)}
            onPostClick={(id) => navigateTo('post-detail', { postId: id })}
            onTagClick={(tag) => navigateTo('tag', { tag })}
          />
        )}

        {state.currentView === 'tag' && (
          <TagPage 
            tag={state.selectedTag!}
            posts={state.posts.filter(p => p.hashtags.includes(state.selectedTag!) && p.published)}
            categories={state.categories}
            onPostClick={(id) => navigateTo('post-detail', { postId: id })}
          />
        )}

        {state.currentView === 'post-detail' && (
          <PostDetail 
            post={state.posts.find(p => p.id === state.selectedPostId)!}
            category={state.categories.find(c => c.id === state.posts.find(p => p.id === state.selectedPostId)?.categoryId)!}
            onTagClick={(tag) => navigateTo('tag', { tag })}
          />
        )}

        {state.currentView === 'admin' && (
          <AdminPanel 
            posts={state.posts}
            categories={state.categories}
            onAddPost={addPost}
            onUpdatePost={updatePost}
            onDeletePost={deletePost}
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
