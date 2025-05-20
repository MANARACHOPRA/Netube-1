import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, SkipForward, 
  SkipBack, Settings, Subtitles 
} from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, posterUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Handle video metadata loaded
  const handleMetadataLoaded = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  
  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };
  
  // Format time
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.min(
        Math.max(0, videoRef.current.currentTime + seconds),
        duration
      );
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  // Show/hide controls on mouse movement
  useEffect(() => {
    const showControlsOnMouseMove = () => {
      setShowControls(true);
      
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      
      controlsTimeout.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };
    
    const playerElement = playerRef.current;
    
    if (playerElement) {
      playerElement.addEventListener('mousemove', showControlsOnMouseMove);
      playerElement.addEventListener('mouseenter', showControlsOnMouseMove);
    }
    
    return () => {
      if (playerElement) {
        playerElement.removeEventListener('mousemove', showControlsOnMouseMove);
        playerElement.removeEventListener('mouseenter', showControlsOnMouseMove);
      }
      
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, [isPlaying]);
  
  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      ref={playerRef}
      className="relative w-full bg-black rounded-md overflow-hidden"
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        className="w-full aspect-video"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleMetadataLoaded}
      />
      
      {/* Play button overlay (visible when paused) */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="bg-primary/80 rounded-full p-5">
            <Play size={32} className="text-white" fill="white" />
          </div>
        </div>
      )}
      
      {/* Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-2 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress bar */}
        <div className="w-full mb-2 group">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:opacity-0 group-hover:[&::-webkit-slider-thumb]:opacity-100"
          />
          <div 
            className="w-full h-1 bg-gray-600 rounded-full relative -mt-1 pointer-events-none"
          >
            <div 
              className="absolute top-0 left-0 h-full bg-primary rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Play/Pause */}
            <button 
              onClick={togglePlay}
              className="text-white hover:text-primary transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>
            
            {/* Skip backward */}
            <button 
              onClick={() => skip(-10)}
              className="text-white hover:text-primary transition-colors"
              aria-label="Skip backward 10 seconds"
            >
              <SkipBack size={22} />
            </button>
            
            {/* Skip forward */}
            <button 
              onClick={() => skip(10)}
              className="text-white hover:text-primary transition-colors"
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward size={22} />
            </button>
            
            {/* Volume control */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={toggleMute}
                className="text-white hover:text-primary transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-14 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer hidden md:block [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
            
            {/* Time display */}
            <div className="text-white text-sm hidden md:block">
              <span>{formatTime(currentTime)}</span>
              <span> / </span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Subtitles */}
            <button 
              className="text-white hover:text-primary transition-colors hidden md:block"
              aria-label="Subtitles"
            >
              <Subtitles size={18} />
            </button>
            
            {/* Settings */}
            <button 
              className="text-white hover:text-primary transition-colors"
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>
            
            {/* Fullscreen */}
            <button 
              onClick={toggleFullscreen}
              className="text-white hover:text-primary transition-colors"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;