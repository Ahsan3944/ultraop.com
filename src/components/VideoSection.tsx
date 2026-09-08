import React, { useState } from 'react';
import { VideoItem } from '../types';
import { useYouTubeVideos } from '../hooks/useYouTubeVideos';
import { Play, Eye, Clock, Youtube, X, Share2, Flame, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio';

export const VideoSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const categories = ['All', 'Minecraft', 'Roblox', 'Valorant', 'Earnings', 'Tech & Gadgets', 'Live Streams', 'Highlights'];

  const { videos: filteredVideos, loading, refresh } = useYouTubeVideos(activeCategory);

  const handlePlayVideo = (video: VideoItem) => {
    sound.playClick();
    setSelectedVideo(video);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo) {
        setSelectedVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo]);

  return (
    <section id="videos" className="py-24 bg-[#F4F4F1] relative overflow-hidden border-t border-black/10">
      {/* Background Watermark */}
      <div className="absolute top-10 right-0 text-[180px] sm:text-[220px] font-black text-black/[0.02] pointer-events-none whitespace-nowrap z-0 select-none font-heading leading-none">
        VIDEOS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF3E00] flex items-center gap-3 mb-3">
              <div className="h-[1.5px] w-8 bg-[#FF3E00]"></div>
              <span>04 / Broadcast Vault & Channels</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#121212] tracking-tighter font-heading">
              ARCHIVES <br className="hidden sm:inline" />
              <span className="font-serif-italic font-normal text-[#FF3E00] lowercase text-4xl sm:text-6xl">
                videos & live streams.
              </span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-3.5 py-2 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] transition-all ${
                  activeCategory === cat
                    ? 'bg-[#121212] text-white shadow-sm'
                    : 'bg-white text-[#121212] border border-black/15 hover:border-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.length === 0 ? (
            <div className="col-span-full py-16 px-8 bg-white border border-black/15 text-center flex flex-col items-center justify-center shadow-sm">
              <div className="w-14 h-14 bg-[#F4F4F1] border border-black/10 flex items-center justify-center mb-4 text-[#FF3E00]">
                <Youtube className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#121212] font-heading mb-2">
                No {activeCategory !== 'All' ? activeCategory : ''} Videos Available Yet
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] max-w-md mb-6 font-medium">
                {activeCategory === 'Earnings'
                  ? 'Only verified broadcasts and videos from the official Op Earnings channel are displayed here.'
                  : activeCategory === 'Highlights'
                  ? 'No highlight clips are currently indexed. Check back soon for curated gameplay moments.'
                  : activeCategory === 'Tech & Gadgets'
                  ? 'No tech and hardware guides currently published. Tune in to upcoming tech reviews.'
                  : 'There are no videos currently indexed in this category.'}
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveCategory('All');
                }}
                className="px-6 py-3 bg-[#121212] hover:bg-[#FF3E00] text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all cursor-pointer"
              >
                View All Vault Videos
              </button>
            </div>
          ) : (
            filteredVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                onClick={() => handlePlayVideo(video)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePlayVideo(video);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Play video: ${video.title}`}
                className="group bg-white border border-black/12 hover:border-black overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col focus-visible:outline-2 focus-visible:outline-[#FF3E00]"
              >
                {/* Thumbnail with overlay & duration */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#121212]">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Duration Badge */}
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/90 text-white text-[10px] font-mono font-bold flex items-center gap-1 border border-white/20">
                    <Clock className="w-3 h-3 text-[#FF3E00]" />
                    {video.duration}
                  </span>

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#FF3E00] text-white text-[9px] font-black uppercase tracking-wider">
                    {video.category}
                  </span>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#121212] text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#FF3E00] transition-all">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Title & Metadata */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <h3 className="text-base font-black text-[#121212] group-hover:text-[#FF3E00] transition-colors line-clamp-2 leading-snug mb-4 font-heading tracking-tight">
                    {video.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-[#555555] pt-3 border-t border-black/10 font-medium">
                    <span className="text-[#121212] font-black uppercase tracking-wider">{video.channel}</span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 font-bold">
                        <Eye className="w-3 h-3 text-[#666666]" />
                        {video.views}
                      </span>
                      <span>•</span>
                      <span>{video.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedVideo(null);
          }}
        >
          <div className="relative w-full max-w-4xl bg-[#121212] border border-white/20 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#181818] border-b border-white/10">
              <div className="flex items-center gap-2 text-white text-sm font-black truncate pr-4">
                <Youtube className="w-4 h-4 text-[#FF3E00] shrink-0" aria-hidden="true" />
                <span id="video-modal-title" className="truncate">{selectedVideo.title}</span>
              </div>
              <button
                id="close-video-modal-btn"
                onClick={() => setSelectedVideo(null)}
                aria-label="Close video player"
                className="p-1.5 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Area */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Footer info */}
            <div className="p-4 bg-[#181818] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-[#FF3E00] text-white font-black text-[10px] uppercase tracking-wider">
                  {selectedVideo.category}
                </span>
                <span className="text-gray-300 font-bold">{selectedVideo.channel}</span>
                <span className="text-gray-400">{selectedVideo.views}</span>
                <span className="text-gray-400">{selectedVideo.date}</span>
              </div>
              <a
                href={selectedVideo.videoUrl || 'https://www.youtube.com/@ultraoplive'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white text-[#121212] hover:bg-[#FF3E00] hover:text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 transition-all"
              >
                <Youtube className="w-4 h-4" />
                Open on YouTube
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

