import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  featuredContent: {
    id: string;
    title: string;
    description: string;
    backdropUrl: string;
    logoUrl?: string;
    videoId?: string;
  };
}

const Hero: React.FC<HeroProps> = ({ featuredContent }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading of content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [featuredContent]);

  return (
    <section 
      className="relative h-[80vh] min-h-[600px] w-full overflow-hidden" 
      style={{ 
        backgroundImage: `url(${featuredContent.backdropUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top'
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-hero-gradient"></div>
      
      {/* Content */}
      <div className="container-custom relative z-10 h-full flex flex-col justify-end pb-28 md:pb-36">
        <div className={`max-w-2xl transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {featuredContent.logoUrl ? (
            <img 
              src={featuredContent.logoUrl} 
              alt={featuredContent.title}
              className="w-64 md:w-96 mb-6"
            />
          ) : (
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{featuredContent.title}</h1>
          )}
          
          <p className="text-lg text-gray-200 mb-8 line-clamp-3 md:line-clamp-none">
            {featuredContent.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              to={`/video/${featuredContent.id}`}
              className="btn btn-primary text-white px-8 py-3 rounded-md flex items-center gap-2"
            >
              <Play size={20} /> Play
            </Link>
            <button className="btn btn-secondary text-white px-8 py-3 rounded-md flex items-center gap-2">
              <Info size={20} /> More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;