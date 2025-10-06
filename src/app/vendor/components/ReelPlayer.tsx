"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface ReelPlayerProps {
  src: string;
  poster?: string;
}

export function ReelPlayer({ src, poster }: ReelPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted as per spec
  const [showControls, setShowControls] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the video is visible
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Autoplay was prevented:", err);
        setIsPlaying(false);
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [inView]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = !video.muted;
      setIsMuted(video.muted);
  }

  return (
    <div
      ref={ref}
      className="relative w-full h-full aspect-[9/16] bg-black rounded-lg overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        muted={isMuted}
        playsInline // Essential for iOS autoplay
        preload="metadata"
        className="w-full h-full object-cover"
      />
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          className="text-white bg-black bg-opacity-50 rounded-full p-4"
        >
          {isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <Play className="h-8 w-8" />
          )}
        </button>
      </div>
       <button
        onClick={(e) => {
            e.stopPropagation(); // Prevent the main click handler from firing
            toggleMute();
        }}
        className="absolute bottom-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
        >
        {isMuted ? "Unmute" : "Mute"}
        </button>
    </div>
  );
}