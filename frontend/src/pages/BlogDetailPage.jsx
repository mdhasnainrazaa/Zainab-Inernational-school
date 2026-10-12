import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Share2, Tag, CheckCircle2 } from 'lucide-react';
import DOMPurify from 'dompurify';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import api from '../services/api';
import { SCHOOL_INFO } from '../data/schoolData';

export default function BlogDetailPage({ onOpenEnquiry }) {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await api.getBlogBySlug(slug);
        if (res.blog) {
          setBlog(res.blog);
          if (res.related) setRelated(res.related);
        }
      } catch (_) {}
      setLoading(false);
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-zips-gold-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-sans font-bold text-zips-green-950 mb-2">Article Not Found</h2>
        <Link to="/blog" className="text-xs font-bold text-zips-green-800 underline">Back to All Articles</Link>
      </div>
    );
  }

  return (
    <div>
      <SEO
        title={blog.title}
        description={blog.excerpt}
        schemaType="Article"
      />

      <PageHero
        badge={blog.category}
        title={blog.title}
        breadcrumb={[{ name: 'News & Blog', path: '/blog' }, { name: blog.title.slice(0, 25) + '...' }]}
        bgImage={blog.featuredImage}
      />

      <article className="py-20 bg-[#FDFCF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Metadata Header */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-premium border border-gray-200 mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100 text-xs text-gray-600">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-zips-green-950">{blog.authorName}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zips-gold-600" />
                  {new Date(blog.publishedAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zips-gold-600" />
                  {blog.readTime || '4 min read'}
                </span>
              </div>
              <div className="bg-zips-gold-100 text-zips-gold-900 font-bold px-3 py-1 rounded-full text-[11px]">
                {blog.category}
              </div>
            </div>

            {/* Content Display */}
            <div
              className="mt-8 prose prose-emerald max-w-none text-zips-charcoal-800 text-sm sm:text-base leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content || '') }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-zips-gold-600 mr-1" />
                {blog.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Admission CTA Box within article */}
          <div className="bg-gradient-to-r from-zips-green-950 to-zips-green-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-zips-gold-500/30">
            <div>
              <h4 className="font-sans font-bold text-lg text-white">Experience ZIPS in Person</h4>
              <p className="text-xs text-gray-300 mt-0.5">Admissions Open 2026-27 (Nursery to Class VIII)</p>
            </div>
            <button
              onClick={onOpenEnquiry}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zips-gold-500 text-zips-green-950 hover:bg-zips-gold-400 transition-all flex-shrink-0"
            >
              Apply Online
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
