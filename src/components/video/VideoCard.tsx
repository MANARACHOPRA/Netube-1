import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock } from 'lucide-react';

interface VideoCardProps {
  video: {
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
  };
  showCreator?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, showCreator = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format view count
  const formatViews = (views?: number): string => {
    if (!views) return '';
    
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    
    return `${views} views`;
  };

  return (
    <Link 
      to={`/video/${video.id}`}
      className="video-card card card-hover block relative rounded-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        
        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 text-xs rounded">
            {video.duration}
          </div>
        )}
        
        {/* Play overlay on hover */}
        <div 
          className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="bg-primary/80 rounded-full p-3">
            <Play size={24} className="text-white" fill="white" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3 bg-dark-lighter">
        <h3 className="font-medium text-white line-clamp-2 mb-1">
          {video.title}
        </h3>
        
        {showCreator && video.creator && (
          <div className="flex items-center mt-2">
            {video.creator.avatarUrl ? (
              <img 
                src={video.creator.avatarUrl} 
                alt={video.creator.name}
                className="w-6 h-6 rounded-full mr-2" 
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                <span className="text-xs">{video.creator.name.charAt(0)}</span>
              </div>
            )}
            <span className="text-gray-400 text-sm">{video.creator.name}</span>
          </div>
        )}
        
        {(video.views || video.createdAt) && (
          <div className="flex items-center text-gray-400 text-xs mt-1">
            {video.views && <span className="mr-2">{formatViews(video.views)}</span>}
            {video.createdAt && (
              <span className="flex items-center">
                <Clock size={12} className="mr-1" /> {video.createdAt}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default VideoCard;