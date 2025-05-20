import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VideoCard from '../video/VideoCard';

interface ContentRowProps {
  title: string;
  videos: Array<{
    id: string;
    title: string;
    thumbnailUrl: string;
    duration?: string;
    views?: number;
    createdAt?: string;
    creator?: {
      name: string;
      avatarUrl?: string;
    };
  }>;
  showCreator?: boolean;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, videos, showCreator = false }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { current } = rowRef;
      const scrollAmount = current.clientWidth * 0.8;
      const scrollLeft = direction === 'left' 
        ? current.scrollLeft - scrollAmount 
        : current.scrollLeft + scrollAmount;
      
      current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="content-row">
      <h2 className="row-title">{title}</h2>
      
      <div className="relative group">
        {/* Scroll buttons */}
        <button 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        
        <button 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="text-white" size={24} />
        </button>
        
        {/* Content slider */}
        <div 
          ref={rowRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-2 px-4 md:px-8 pb-4"
        >
          {videos.map((video) => (
            <div key={video.id} className="flex-none w-64 md:w-72">
              <VideoCard video={video} showCreator={showCreator} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentRow;