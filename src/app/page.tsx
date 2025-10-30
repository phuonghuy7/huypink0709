'use client';

import { useState, useEffect } from 'react'; // Import useEffect
import { VideoList } from '@/components/video-list';
import { UploadMenu } from '@/components/upload-menu';
import { Header } from '@/components/header';
import { VideoPreviewModal } from '@/components/video-preview-modal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Define the video type
interface Video {
  title: string;
  url?: string;
  embedUrl?: string;
  thumbnail?: string;
}

export default function Home() {
  // Initialize state with an empty array. It will be populated from localStorage on the client.
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  // Effect to load videos from localStorage on initial client-side render
  useEffect(() => {
    try {
      const storedVideos = localStorage.getItem('videoLibrary');
      if (storedVideos) {
        setVideos(JSON.parse(storedVideos));
      }
    } catch (error) {
      console.error("Failed to parse videos from localStorage", error);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to save videos to localStorage whenever the list changes
  useEffect(() => {
    try {
      localStorage.setItem('videoLibrary', JSON.stringify(videos));
    } catch (error) {
      console.error("Failed to save videos to localStorage", error);
    }
  }, [videos]); // This runs every time the `videos` state changes

  const handleVideoAdded = (video: Video) => {
    setVideos(prevVideos => [...prevVideos, video]);
  };

  const handleVideoSelect = (video: Video) => {
    if (isDeleteMode) return;
    setSelectedVideo(video);
  };

  const handleVideoDelete = (videoIndex: number) => {
    setVideos(prevVideos => prevVideos.filter((_, index) => index !== videoIndex));
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4 md:p-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Welcome to Your Video Library</CardTitle>
                <Button variant="destructive" onClick={() => setIsDeleteMode(!isDeleteMode)}>
                  {isDeleteMode ? 'Cancel' : 'Delete Videos'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p>Use the buttons below to upload videos from your device or Google Drive. </p>
              <p>Click on any video in the list to open a preview.</p>
            </CardContent>
          </Card>

          <UploadMenu onVideoAdded={handleVideoAdded} />

          <VideoList 
            videos={videos} 
            onVideoSelect={handleVideoSelect} 
            onVideoDelete={handleVideoDelete}
            isDeleteMode={isDeleteMode}
          />
        </div>
      </main>

      <VideoPreviewModal video={selectedVideo} onClose={handleCloseModal} />
    </div>
  );
}
