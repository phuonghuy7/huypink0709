'use client';

import { Card, CardContent } from "./ui/card";

// Define the video type to match the one in page.tsx
interface Video {
  title: string;
  url?: string;
  embedUrl?: string;
  thumbnail?: string; // For thumbnails from any source
}

interface VideoListProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

export function VideoList({ videos, onVideoSelect }: VideoListProps) {
  if (videos.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-gray-500">Your video list is empty.</p>
          <p className="text-center text-gray-500">Use the buttons above to add videos.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video, index) => (
        <Card
          key={index}
          className="cursor-pointer group overflow-hidden transition-shadow hover:shadow-lg"
          onClick={() => onVideoSelect(video)}
        >
          <CardContent className="p-0">
            <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden relative">
              {/* Media preview: Use a div with background-image for better compatibility */}
              {video.thumbnail ? (
                <div
                  style={{ backgroundImage: `url(${video.thumbnail})` }}
                  className="w-full h-full bg-cover bg-center"
                  role="img"
                  aria-label={video.title}
                />
              ) : (
                // Fallback for everything else
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-sm text-gray-500">No preview</p>
                </div>
              )}

              {/* Overlay with Play Icon */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                <svg
                  className="w-14 h-14 text-white opacity-0 group-hover:opacity-90 transform-gpu scale-75 group-hover:scale-100 transition-all"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold truncate flex items-center text-sm">
                {/* File type icon */}
                <svg
                  className="h-5 w-5 mr-2 text-red-500 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm14.553 1.106A1 1 0 0016 7.v6a1 1 0 00.447.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                {video.title}
              </h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
