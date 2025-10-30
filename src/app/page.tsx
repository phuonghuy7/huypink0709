'use client';

import { useState } from 'react';
import { VideoList } from '@/components/video-list';
import { UploadMenu } from '@/components/upload-menu';
import { Header } from '@/components/header';
import { VideoPreviewModal } from '@/components/video-preview-modal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Import Button

// Define the video type
interface Video {
  title: string;
  url?: string;
  embedUrl?: string;
  thumbnail?: string;
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false); // State for delete mode

  const handleVideoAdded = (video: Video) => {
    setVideos(prevVideos => [...prevVideos, video]);
  };

  const handleVideoSelect = (video: Video) => {
    // Do not open preview if in delete mode
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
                {/* Toggle Delete Mode Button */}
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

          {/* Pass delete mode state and handler to VideoList */}
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
