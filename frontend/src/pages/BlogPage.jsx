import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import api from '../services/api';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.getBlogs({ category, search });
        if (res.blogs) setBlogs(res.blogs);
      } catch (_) {}
      setLoading(false);
    };
    fetchBlogs();
  }, [category, search]);

  const categories = ['All', 'Academic Insights', 'School Philosophy', 'Early Years Education'];

  return (
    <div>
      <SEO
        title="News, Insights & Academic Articles"
        description="Read educational articles, academic philosophy, and latest circulars from Zainab International Public School, Rathgawan, Aligarh."
      />

      <PageHero
        badge="School Journal & Insights"
        title="Educational News, Philosophy & Updates"
        subtitle="Exploring inquiry pedagogy, character building, and 21st-century educational best practices."
        breadcrumb={[{ name: 'News & Blog' }]}
        bgImage="/infrastructure/zips-school-spacious-classroom-lecture-hall.webp"
      />

      <section className="py-20 bg-[#FDFCF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Categories */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    category === cat
                      ? 'bg-zips-green-900 text-white shadow-md'
                      : 'bg-white text-zips-charcoal-800 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-zips-green-700 bg-white"
              />
            </div>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-zips-gold-400 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-zips-green-950/85 text-zips-gold-300 px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-xs">
                    {blog.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-zips-gold-600" />
                      <span>{new Date(blog.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{blog.readTime || '4 min read'}</span>
                    </div>
                    <h3 className="font-sans font-bold text-lg text-zips-green-950 mb-2 line-clamp-2 group-hover:text-zips-gold-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-zips-charcoal-700 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-zips-charcoal-800">{blog.authorName}</span>
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-zips-green-900 group-hover:text-zips-gold-700 transition-colors"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
