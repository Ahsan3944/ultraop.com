import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { BLOGS_DATA } from '../data/gamingData';
import { BookOpen, Clock, Heart, Share2, X, ArrowRight, User, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { updateDocumentSEO, ROUTE_SEO } from '../utils/seo';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (selectedPost) {
      const articleSchema = {
        '@type': 'Article',
        '@id': `https://ultraop.in/blog/${selectedPost.id}/#article`,
        headline: selectedPost.title,
        description: selectedPost.excerpt,
        image: selectedPost.image,
        author: {
          '@type': 'Person',
          name: selectedPost.author,
          url: 'https://ultraop.in/'
        },
        publisher: {
          '@type': 'Organization',
          name: 'UltraOP',
          logo: 'https://ultraop.in/assets/images/brand/logo/ultraop-logo.svg'
        },
        datePublished: '2025-08-16',
        dateModified: '2025-08-18',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://ultraop.in/blog/${selectedPost.id}/`
        }
      };

      updateDocumentSEO({
        title: `${selectedPost.title} — UltraOP Blog`,
        description: selectedPost.excerpt,
        canonicalPath: `/blog/${selectedPost.id}/`,
        ogImage: selectedPost.image,
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog/' },
          { name: selectedPost.title, path: `/blog/${selectedPost.id}/` }
        ],
        schema: articleSchema
      });
    }
  }, [selectedPost]);

  const handleOpenPost = (post: BlogPost) => {
    sound.playClick();
    setSelectedPost(post);
  };

  const handleClosePost = () => {
    sound.playClick();
    setSelectedPost(null);
    updateDocumentSEO(ROUTE_SEO.home);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPost) {
        handleClosePost();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPost]);

  const handleLikePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playScore();
    setLikedPosts((prev) => {
      const current = prev[postId] || 0;
      const next = current + 1;
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
      return { ...prev, [postId]: next };
    });
  };

  return (
    <section id="blogs" className="py-24 bg-[#F4F4F1] relative overflow-hidden border-t border-black/10">
      {/* Background Watermark */}
      <div className="absolute top-10 right-0 text-[180px] sm:text-[220px] font-black text-black/[0.02] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        JOURNAL
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-left max-w-3xl mb-14"
        >
          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3 mb-4">
            <div className="h-[1.5px] w-8 bg-[#FF3E00]"></div>
            <span>06 / Technical Insights & Guides</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#121212] tracking-tighter leading-tight font-heading">
            EDITORIAL <br className="hidden sm:inline" />
            <span className="font-serif-italic font-normal text-[#FF3E00] lowercase text-4xl sm:text-6xl">
              and creator analysis.
            </span>
          </h2>
          <p className="mt-4 text-[#555555] text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            Insightful breakdowns covering gaming setup optimizations, creator monetization playbooks, and hardware guides.
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOGS_DATA.map((post, idx) => {
            const likesCount = post.likes + (likedPosts[post.id] || 0);

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => handleOpenPost(post)}
                className="group bg-white border border-black/12 hover:border-black overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Article Hero Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121212]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#121212] text-white text-[9px] font-black uppercase tracking-wider">
                      {post.category}
                    </span>

                    <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/80 text-white text-[10px] font-mono flex items-center gap-1 border border-white/20">
                      <Clock className="w-3 h-3 text-[#FF3E00]" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="text-[10px] text-[#777777] font-black uppercase tracking-widest mb-2">
                      {post.date} • BY {post.author}
                    </div>

                    <h3 className="text-lg font-black text-[#121212] group-hover:text-[#FF3E00] transition-colors line-clamp-2 leading-snug mb-3 font-heading tracking-tight">
                      {post.title}
                    </h3>

                    <p className="text-[#666666] text-xs line-clamp-3 leading-relaxed mb-4 font-medium">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 pb-6 pt-3 border-t border-black/10 flex items-center justify-between text-xs">
                  <button
                    onClick={(e) => handleLikePost(post.id, e)}
                    className="flex items-center gap-1.5 text-[#666666] hover:text-[#FF3E00] transition-colors font-bold"
                  >
                    <Heart className="w-4 h-4 text-[#FF3E00] fill-[#FF3E00]/20" />
                    <span>{likesCount}</span>
                  </button>

                  <span className="text-[#121212] group-hover:text-[#FF3E00] font-black text-[10px] uppercase tracking-[0.15em] flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    Read Article <ArrowRight className="w-3.5 h-3.5 text-[#FF3E00]" />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>


      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-reader-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClosePost();
          }}
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white border border-black shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#F4F4F1] border-b border-black/10">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-[#121212] text-white text-[9px] font-black uppercase tracking-wider">
                  {selectedPost.category}
                </span>
                <span className="text-[#555555] text-xs flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#FF3E00]" /> {selectedPost.readTime}
                </span>
              </div>

              <button
                id="close-blog-modal-btn"
                onClick={handleClosePost}
                aria-label="Close article reader"
                className="p-1.5 bg-black/5 hover:bg-black/10 text-[#121212] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Reader Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-white">
              <h2 id="article-reader-title" className="text-2xl sm:text-3xl font-black text-[#121212] leading-tight font-heading tracking-tight">
                {selectedPost.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-[#777777] border-y border-black/10 py-3 font-medium">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#FF3E00]" />
                  <span>Author: <strong className="text-[#121212]">{selectedPost.author}</strong></span>
                </div>
                <span>•</span>
                <span>{selectedPost.date}</span>
              </div>

              {/* Cover Image in Modal */}
              <div className="overflow-hidden aspect-[16/8] w-full border border-black/10 bg-[#121212]">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Paragraphs */}
              <div className="space-y-4 text-[#333333] text-sm sm:text-base leading-relaxed">
                {selectedPost.content.map((p, i) => (
                  <p key={i} className="bg-[#F4F4F1] p-4 border border-black/10 font-medium">
                    {p}
                  </p>
                ))}
              </div>

              {/* Tag Cloud */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/10">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#F4F4F1] text-[#555555] text-xs font-semibold flex items-center gap-1 border border-black/10"
                  >
                    <Tag className="w-3 h-3 text-[#FF3E00]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Reader Footer */}
            <div className="p-4 bg-[#F4F4F1] border-t border-black/10 flex items-center justify-between text-xs">
              <button
                onClick={(e) => handleLikePost(selectedPost.id, e)}
                className="px-4 py-2 bg-white text-[#FF3E00] border border-black/15 hover:border-black font-black text-[10px] uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <Heart className="w-3.5 h-3.5 fill-[#FF3E00]" />
                Appreciate ({selectedPost.likes + (likedPosts[selectedPost.id] || 0)})
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  navigator.clipboard?.writeText(window.location.href);
                  confetti({ particleCount: 20, spread: 40 });
                }}
                className="px-4 py-2 bg-[#121212] hover:bg-[#FF3E00] text-white font-black text-[10px] uppercase tracking-[0.15em] flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
