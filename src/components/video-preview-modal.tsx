'use client';

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Define the video type
interface Video {
  title: string;
  url?: string; // For local files
  embedUrl?: string; // For Google Drive files
}

interface VideoPreviewModalProps {
  video: Video | null;
  onClose: () => void;
}

export function VideoPreviewModal({ video, onClose }: VideoPreviewModalProps) {
  if (!video) {
    return null;
  }

  // When the user clicks the backdrop, close the modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <Card className="w-full max-w-4xl h-full max-h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="truncate">{video.title}</CardTitle>
          <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </CardHeader>
        <CardContent className="flex-grow p-0">
          <div className="w-full h-full bg-black">
            {video.url ? (
              <video src={video.url} controls autoPlay className="w-full h-full" />
            ) : video.embedUrl ? (
              <iframe
                src={video.embedUrl}
                allow="autoplay; fullscreen"
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white">Video source not found.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
