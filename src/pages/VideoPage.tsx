import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/video/VideoPlayer';
import ContentRow from '../components/home/ContentRow';
import { getVideoById, getRelatedVideos } from '../data/mockData';
import { ThumbsUp, Share2, Bookmark, Flag } from 'lucide-react';

const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<any>(null);
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate loading
      setIsLoading(true);
      // Get video details
      const videoData = getVideoById(id);
      
      if (videoData) {
        setVideo(videoData);
        
        // Get related videos
        const related = getRelatedVideos(videoData.relatedVideos || []);
        setRelatedVideos(related);
      }
      
      // Simulate network delay
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark pt-20 px-4 flex justify-center">
        <div className="animate-pulse flex flex-col w-full max-w-6xl">
          <div className="h-96 bg-dark-lighter rounded-lg mb-6"></div>
          <div className="h-8 bg-dark-lighter rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-dark-lighter rounded w-1/2 mb-8"></div>
          <div className="flex gap-4 mb-8">
            <div className="h-12 w-12 bg-dark-lighter rounded-full"></div>
            <div className="flex-1">
              <div className="h-5 bg-dark-lighter rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-dark-lighter rounded w-1/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-dark pt-20 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Video Not Found</h2>
          <p className="text-gray-400">The video you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-20">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Video player */}
            <VideoPlayer 
              videoUrl={video.videoUrl}
              posterUrl={video.thumbnailUrl}
              title={video.title}
            />
            
            {/* Video info */}
            <div className="mt-4">
              <h1 className="text-2xl font-semibold">{video.title}</h1>
              
              <div className="flex flex-wrap justify-between items-center mt-2 py-4 border-b border-gray-800">
                <div className="text-gray-400 text-sm flex items-center gap-3">
                  <span>{formatNumber(video.views)} views</span>
                  <span>•</span>
                  <span>{formatDate(video.createdAt)}</span>
                </div>
                
                <div className="flex space-x-4 mt-2 sm:mt-0">
                  <button className="flex items-center text-gray-300 hover:text-primary transition-colors">
                    <ThumbsUp size={18} className="mr-1" /> {formatNumber(video.likes)}
                  </button>
                  <button className="flex items-center text-gray-300 hover:text-primary transition-colors">
                    <Share2 size={18} className="mr-1" /> Share
                  </button>
                  <button className="flex items-center text-gray-300 hover:text-primary transition-colors">
                    <Bookmark size={18} className="mr-1" /> Save
                  </button>
                  <button className="flex items-center text-gray-300 hover:text-primary transition-colors">
                    <Flag size={18} className="mr-1" /> Report
                  </button>
                </div>
              </div>
              
              {/* Creator info */}
              <div className="flex items-start py-4 border-b border-gray-800">
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src={video.creator.avatarUrl} 
                    alt={video.creator.name}
                    className="w-12 h-12 rounded-full" 
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{video.creator.name}</h3>
                      <p className="text-gray-400 text-sm">{formatNumber(video.creator.subscribers)} subscribers</p>
                    </div>
                    
                    <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium">
                      Subscribe
                    </button>
                  </div>
                  
                  <p className="mt-4 text-gray-300 whitespace-pre-line">
                    {video.description}
                  </p>
                  
                  {video.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {video.tags.map((tag: string) => (
                        <span 
                          key={tag} 
                          className="bg-dark-lighter px-2 py-1 rounded-md text-xs text-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Related videos */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-medium mb-4">Related Videos</h3>
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <div key={relatedVideo.id} className="flex gap-3">
                  <div className="flex-shrink-0 w-40 h-24 overflow-hidden rounded">
                    <img 
                      src={relatedVideo.thumbnailUrl} 
                      alt={relatedVideo.title}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium line-clamp-2 text-sm">{relatedVideo.title}</h4>
                    <p className="text-gray-400 text-xs mt-1">{relatedVideo.creator.name}</p>
                    <div className="flex text-gray-400 text-xs mt-1">
                      <span>{formatNumber(relatedVideo.views)} views</span>
                      <span className="mx-1">•</span>
                      <span>{relatedVideo.createdAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;