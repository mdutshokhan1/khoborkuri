
import React, { useState } from 'react';
import { Category, View } from '../types';

interface NavbarProps {
  categories: Category[];
  onNavigate: (view: View, params?: any) => void;
  currentView: View;
  selectedCategoryId?: string;
}

const Navbar: React.FC<NavbarProps> = ({ categories, onNavigate, currentView, selectedCategoryId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')}
              className="flex-shrink-0 flex items-center"
            >
              <h1 className="text-3xl font-bold news-title text-red-600 tracking-tighter">KHOBORKURI</h1>
            </button>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <button
                onClick={() => onNavigate('home')}
                className={`${currentView === 'home' ? 'border-red-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}
              >
                Home
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onNavigate('category', { categoryId: cat.id })}
                  className={`${selectedCategoryId === cat.id ? 'border-red-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <button
              onClick={() => onNavigate('admin')}
              className="ml-8 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Admin Dashboard
            </button>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className={isOpen ? 'hidden' : 'inline-flex'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                <path className={isOpen ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-b border-gray-200`}>
        <div className="pt-2 pb-3 space-y-1">
          <button
            onClick={() => { onNavigate('home'); setIsOpen(false); }}
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 w-full text-left"
          >
            Home
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { onNavigate('category', { categoryId: cat.id }); setIsOpen(false); }}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 w-full text-left"
            >
              {cat.name}
            </button>
          ))}
          <button
            onClick={() => { onNavigate('admin'); setIsOpen(false); }}
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-red-50 w-full text-left"
          >
            Admin Panel
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
