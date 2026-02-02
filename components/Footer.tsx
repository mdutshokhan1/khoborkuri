
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-bold news-title text-red-500 mb-6">KHOBORKURI</h2>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              Khoborkuri is your premier digital news destination, providing accurate, unbiased, and timely news from across the globe.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">YouTube</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Archive</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Stay updated with our daily headlines.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-gray-800 border-none rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-red-500"
              />
              <button className="bg-red-600 px-4 py-2 rounded-r-lg font-bold hover:bg-red-700 transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Khoborkuri Digital Media. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Built for Journalism</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
