'use client';

import { useState } from 'react';
import { VideoList } from '@/components/video-list';
import { UploadMenu } from '@/components/upload-menu';
import { Header } from '@/components/header';
import { VideoPreviewModal } from '@/components/video-preview-modal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define the video type with the new thumbnail property
interface Video {
  title: string;
  url?: string;
  embedUrl?: string;
  thumbnail?: string;
}

export default function Home() {
  // The state for the video list is now reset on each page load.
  // This removes the complexity and bugs associated with localStorage.
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleVideoAdded = (video: Video) => {
    setVideos(prevVideos => [...prevVideos, video]);
  };

  // When a video is selected from the list, set it as the selected video
  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  // To close the modal, just set the selected video to null
  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4 md:p-8">
        <div className="space-y-8">
          {/* Welcome/Instruction card */}
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Your Video Library</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Use the buttons below to upload videos from your device or Google Drive. </p>
              <p>Click on any video in the list to open a preview.</p>
            </CardContent>
          </Card>

          {/* The upload menu */}
          <UploadMenu onVideoAdded={handleVideoAdded} />

          {/* The list of videos */}
          <VideoList videos={videos} onVideoSelect={handleVideoSelect} />
        </div>
      </main>

      {/* The modal for video previews */}
      <VideoPreviewModal video={selectedVideo} onClose={handleCloseModal} />
    </div>
  );
}
