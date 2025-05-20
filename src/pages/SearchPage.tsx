import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchVideos } from '../data/mockData';
import VideoCard from '../components/video/VideoCard';
import { Search } from 'lucide-react';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q') || '';
    setQuery(searchQuery);
    
    if (searchQuery) {
      // Simulate loading
      setIsLoading(true);
      
      // Search for videos
      setTimeout(() => {
        const searchResults = searchVideos(searchQuery);
        setResults(searchResults);
        setIsLoading(false);
      }, 500);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-dark pt-24">
      <div className="container-custom pb-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">
            {query ? `Search results for "${query}"` : 'Search'}
          </h1>
          {query && !isLoading && (
            <p className="text-gray-400">
              Found {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-video bg-dark-lighter rounded-md mb-3"></div>
                <div className="h-4 bg-dark-lighter rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-dark-lighter rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((video) => (
              <VideoCard key={video.id} video={video} showCreator={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            {query ? (
              <>
                <Search size={48} className="mx-auto text-gray-600 mb-4" />
                <h2 className="text-xl font-medium mb-2">No videos found</h2>
                <p className="text-gray-400">
                  We couldn't find any videos matching "{query}"
                </p>
                <p className="text-gray-500 mt-4">
                  Try using different keywords or check for typos
                </p>
              </>
            ) : (
              <>
                <Search size={48} className="mx-auto text-gray-600 mb-4" />
                <h2 className="text-xl font-medium">Search for videos</h2>
                <p className="text-gray-400 mt-2">
                  Use the search bar above to find videos
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;