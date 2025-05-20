import React from 'react';
import Hero from '../components/home/Hero';
import ContentRow from '../components/home/ContentRow';
import { 
  featuredContent, 
  trendingVideos, 
  documentaries, 
  popularCreators, 
  newReleases 
} from '../data/mockData';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark">
      {/* Hero section with featured content */}
      <Hero featuredContent={featuredContent} />
      
      {/* Content rows */}
      <div className="pb-8">
        <ContentRow 
          title="Trending Now" 
          videos={trendingVideos}
          showCreator={true}
        />
        
        <ContentRow 
          title="Documentaries" 
          videos={documentaries}
          showCreator={true}
        />
        
        <ContentRow 
          title="Popular Creators" 
          videos={popularCreators}
          showCreator={true}
        />
        
        <ContentRow 
          title="New Releases" 
          videos={newReleases}
          showCreator={true}
        />
      </div>
    </div>
  );
};

export default HomePage;