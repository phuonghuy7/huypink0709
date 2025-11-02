'use client';

import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { VideoList } from '@/components/video-list';
import { UploadMenu } from '@/components/upload-menu';
import { Header } from '@/components/header';
import { VideoPreviewModal } from '@/components/video-preview-modal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Video {
  id: string; // Add id field for Firestore document id
  title: string;
  url?: string;
  embedUrl?: string;
  thumbnail?: string;
}

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect to login if not authenticated
    }

    if (user) {
      // Create a query to get videos for the current user
      const q = query(collection(db, `users/${user.uid}/videos`));

      // Use onSnapshot for real-time updates
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userVideos: Video[] = [];
        querySnapshot.forEach((doc) => {
          userVideos.push({ id: doc.id, ...doc.data() } as Video);
        });
        setVideos(userVideos);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [user, loading, router]);

  const handleVideoAdded = async (video: Omit<Video, 'id'>) => {
    if (!user) return;

    // Create a new document reference with a unique ID
    const videoRef = doc(collection(db, `users/${user.uid}/videos`));
    const newVideo: Video = { ...video, id: videoRef.id };

    // Save the video to the user's subcollection in Firestore
    await setDoc(videoRef, newVideo);
  };

  const handleVideoSelect = (video: Video) => {
    if (isDeleteMode) return;
    setSelectedVideo(video);
  };

  const handleVideoDelete = async (videoId: string) => {
    if (!user) return;
    
    // Reference to the specific video document
    const videoRef = doc(db, `users/${user.uid}/videos`, videoId);

    // Delete the document from Firestore
    await deleteDoc(videoRef);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  if (loading || !user) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

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
            onVideoDelete={handleVideoDelete} // Pass the new delete handler
            isDeleteMode={isDeleteMode}
          />
        </div>
      </main>

      <VideoPreviewModal video={selectedVideo} onClose={handleCloseModal} />
    </div>
  );
}
