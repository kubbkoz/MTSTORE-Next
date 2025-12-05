import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../../constants';

const BlogGrid: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12">
          <h2 className="text-5xl md:text-6xl font-black uppercase italic mb-4 font-tech tracking-wide">
            Zo sveta <span className="text-brand">cyklistiky</span>
          </h2>
          <div className="w-24 h-1.5 bg-brand skew-x-[-20deg]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="bg-white group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 flex items-center text-xs font-bold uppercase tracking-wider">
                  <Calendar className="w-3 h-3 mr-2 text-brand" />
                  {post.date}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-brand transition-colors line-clamp-2 font-tech uppercase tracking-wide leading-none">{post.title}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3 font-medium">{post.excerpt}</p>
                <div className="flex items-center text-brand font-bold text-sm uppercase tracking-widest group/link">
                  Čítať viac 
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-2 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;