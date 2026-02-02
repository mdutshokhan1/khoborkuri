
import React, { useState } from 'react';
import { Post, Category } from '../types';

interface AdminPanelProps {
  posts: Post[];
  categories: Category[];
  onAddPost: (post: Omit<Post, 'id' | 'createdAt'>) => void;
  onUpdatePost: (id: string, updates: Partial<Post>) => void;
  onDeletePost: (id: string) => void;
  onAddCategory: (name: string) => void;
  onDeleteCategory: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  posts, 
  categories, 
  onAddPost, 
  onUpdatePost, 
  onDeletePost,
  onAddCategory,
  onDeleteCategory
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'categories' | 'new-post' | 'guide'>('posts');
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Form States
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [tags, setTags] = useState('');
  const [selectedCatId, setSelectedCatId] = useState(categories[0]?.id || '');
  const [catName, setCatName] = useState('');

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    const hashtagList = tags.split(',').map(t => t.trim().replace('#', '')).filter(t => t);
    
    if (editingPost) {
      onUpdatePost(editingPost.id, {
        title, content, imageUrl, videoUrl, hashtags: hashtagList, categoryId: selectedCatId
      });
      setEditingPost(null);
    } else {
      onAddPost({
        title, content, imageUrl, videoUrl, hashtags: hashtagList, categoryId: selectedCatId, published: true
      });
    }

    // Reset
    setTitle(''); setContent(''); setImageUrl(''); setVideoUrl(''); setTags('');
    setActiveTab('posts');
  };

  const startEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setImageUrl(post.imageUrl || '');
    setVideoUrl(post.videoUrl || '');
    setTags(post.hashtags.join(', '));
    setSelectedCatId(post.categoryId);
    setActiveTab('new-post');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button 
          onClick={() => setActiveTab('posts')}
          className={`px-6 py-4 font-bold text-sm uppercase tracking-wider ${activeTab === 'posts' ? 'border-b-2 border-red-600 text-red-600 bg-white' : 'text-gray-500'}`}
        >
          Manage Posts
        </button>
        <button 
          onClick={() => { setActiveTab('new-post'); setEditingPost(null); }}
          className={`px-6 py-4 font-bold text-sm uppercase tracking-wider ${activeTab === 'new-post' ? 'border-b-2 border-red-600 text-red-600 bg-white' : 'text-gray-500'}`}
        >
          {editingPost ? 'Edit Post' : 'Create Post'}
        </button>
        <button 
          onClick={() => setActiveTab('categories')}
          className={`px-6 py-4 font-bold text-sm uppercase tracking-wider ${activeTab === 'categories' ? 'border-b-2 border-red-600 text-red-600 bg-white' : 'text-gray-500'}`}
        >
          Categories
        </button>
        <button 
          onClick={() => setActiveTab('guide')}
          className={`px-6 py-4 font-bold text-sm uppercase tracking-wider ${activeTab === 'guide' ? 'border-b-2 border-red-600 text-red-600 bg-white' : 'text-gray-500'}`}
        >
          Setup Guide
        </button>
      </div>

      <div className="p-8">
        {activeTab === 'posts' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map(post => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {categories.find(c => c.id === post.categoryId)?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button onClick={() => startEdit(post)} className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button onClick={() => onDeletePost(post.id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'new-post' && (
          <form onSubmit={handleSubmitPost} className="space-y-6 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                <input 
                  value={title} onChange={e => setTitle(e.target.value)} required
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 p-2 border"
                  placeholder="Enter news headline..."
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Content</label>
                <textarea 
                  rows={8} value={content} onChange={e => setContent(e.target.value)} required
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 p-2 border"
                  placeholder="Tell the story..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                <input 
                  value={imageUrl} onChange={e => setImageUrl(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 p-2 border"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Video URL (YouTube)</label>
                <input 
                  value={videoUrl} onChange={e => setVideoUrl(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 p-2 border"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Hashtags (comma separated)</label>
                <input 
                  value={tags} onChange={e => setTags(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 p-2 border"
                  placeholder="Election, Cyclone, Breaking"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                <select 
                  value={selectedCatId} onChange={e => setSelectedCatId(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 p-2 border bg-white"
                >
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button 
                type="submit"
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg"
              >
                {editingPost ? 'Update News' : 'Publish News'}
              </button>
            </div>
          </form>
        )}

        {activeTab === 'categories' && (
          <div className="max-w-xl space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold mb-4">Add New Category</h3>
              <div className="flex gap-4">
                <input 
                  value={catName} onChange={e => setCatName(e.target.value)}
                  className="flex-grow border-gray-300 rounded-lg shadow-sm p-2 border"
                  placeholder="Category Name"
                />
                <button 
                  onClick={() => { if(catName) { onAddCategory(catName); setCatName(''); }}}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800"
                >
                  Add
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Existing Categories</h3>
              <ul className="divide-y divide-gray-200">
                {categories.map(cat => (
                  <li key={cat.id} className="py-4 flex justify-between items-center">
                    <span className="font-medium">{cat.name}</span>
                    <button 
                      onClick={() => onDeleteCategory(cat.id)}
                      className="text-red-600 hover:text-red-900 text-sm font-bold disabled:opacity-50"
                      disabled={categories.length <= 1}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="prose prose-blue max-w-4xl">
            <h2 className="news-title text-3xl font-bold">Khoborkuri Setup & Operation Guide</h2>
            <p className="text-gray-600 mb-8">Follow these steps to manage your digital news platform effectively.</p>
            
            <div className="space-y-8">
              <section>
                <h3 className="font-bold text-xl text-red-600">1. Daily Posting</h3>
                <p>Click the <strong>"Create Post"</strong> tab. Enter your headline, content, and paste an image URL (from unsplash or similar) or a YouTube link. Tagging with commas (e.g., #Election) automatically makes the post searchable via hashtags.</p>
              </section>

              <section>
                <h3 className="font-bold text-xl text-red-600">2. Category Management</h3>
                <p>Use the <strong>"Categories"</strong> tab to add new sections like "Sports" or "Tech". The main website menu will update automatically. If you delete a category, its posts are safely moved to the primary news category.</p>
              </section>

              <section>
                <h3 className="font-bold text-xl text-red-600">3. Video Support</h3>
                <p>Embed any YouTube video by pasting its URL into the Video URL field. The platform handles the embedding logic automatically for high-quality playback.</p>
              </section>

              <section className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="font-bold text-xl text-blue-900 mb-2">💡 Pro-Tip: WordPress Migration</h3>
                <p className="text-blue-800 text-sm">This React app uses browser storage. For a professional global deployment, we recommend installing WordPress with the <strong>"Newspaper"</strong> or <strong>"ColorMag"</strong> free theme and the <strong>"Yoast SEO"</strong> plugin.</p>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
