'use client';

import { useRef, useEffect, useState } from 'react';
import { Button } from "./ui/button";

// Define the props interface to include the new video properties
interface UploadMenuProps {
  onVideoAdded: (video: { title: string; url?: string; embedUrl?: string; thumbnail?: string }) => void;
}

// Your OAuth 2.0 Client ID from Google Cloud Console
const CLIENT_ID = "634241991431-l5sp4u83qukaje0hdp8iv7js1fjo5cpj.apps.googleusercontent.com";
// The API Key for the Google Picker API (you need to create this)
const API_KEY = "AIzaSyATXq3HEP1VPYLPDm0p9trG7wT5uyXp2ms"; // IMPORTANT: Replace with your actual API key
const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

// Extend the Window interface to include gapi and google
declare global {
    interface Window {
        gapi: any;
        google: any;
    }
}

export function UploadMenu({ onVideoAdded }: UploadMenuProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pickerApiLoaded, setPickerApiLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('picker', () => {
        setPickerApiLoaded(true);
      });
    };
    document.body.appendChild(script);
  }, []);

  const handleUploadFromDevice = () => {
    fileInputRef.current?.click();
  };

  // Generates a thumbnail from a video file
  const generateVideoThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const url = URL.createObjectURL(file);

      video.src = url;
      video.muted = true;

      video.onloadeddata = () => {
        video.currentTime = 1; // Seek to 1 second
      };

      video.onseeked = () => {
        // Set canvas dimensions to the video's dimensions
        const { videoWidth, videoHeight } = video;
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        const context = canvas.getContext('2d');
        if (context) {
          // Draw the video frame onto the canvas
          context.drawImage(video, 0, 0, videoWidth, videoHeight);
          // Get the thumbnail as a data URL
          const dataUrl = canvas.toDataURL('image/jpeg');
          URL.revokeObjectURL(url); // Clean up the object URL
          resolve(dataUrl);
        } else {
          URL.revokeObjectURL(url);
          reject(new Error('Could not get canvas context.'));
        }
      };

      video.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
      };

      video.load();
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);

      // Check if the file is a video
      if (file.type.startsWith('video/')) {
        try {
          // Generate a thumbnail
          const thumbnail = await generateVideoThumbnail(file);
          onVideoAdded({ title: file.name, url: localUrl, thumbnail: thumbnail });
        } catch (error) {
          console.error('Thumbnail generation failed:', error);
          // If thumbnail fails, add video without it
          onVideoAdded({ title: file.name, url: localUrl });
        }
      } else {
        // If it's not a video (e.g., an image), use the localUrl as the thumbnail
        onVideoAdded({ title: file.name, thumbnail: localUrl });
      }
    }
  };

  const handleUploadFromDrive = () => {
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (tokenResponse: any) => {
        if (tokenResponse && tokenResponse.access_token) {
          if (pickerApiLoaded) {
            createPicker(tokenResponse.access_token);
          }
        }
      },
    });
    // The 'prompt' parameter is removed. The user will only be prompted on the first grant.
    tokenClient.requestAccessToken();
  };


  const createPicker = (accessToken: string) => {
    const docsView = new window.google.picker.DocsView()
      .setIncludeFolders(true)
      .setSelectFolderEnabled(true)
      .setLabel("Google Drive");

    const videoView = new window.google.picker.View(window.google.picker.ViewId.DOCS_VIDEOS);
    const photoView = new window.google.picker.View(window.google.picker.ViewId.DOCS_IMAGES);

    const picker = new window.google.picker.PickerBuilder()
      .setAppId(CLIENT_ID.split('-')[0])
      .setOAuthToken(accessToken)
      .addView(docsView)
      .addView(videoView)
      .addView(photoView)
      .enableFeature(window.google.picker.Feature.SUPPORT_DRIVES)
      .setDeveloperKey(API_KEY)
      .setCallback(async (data: any) => { // Make the callback async
        if (data.action === window.google.picker.Action.PICKED) {
          const doc = data.docs[0];
          let thumbnail = doc.thumbnails && doc.thumbnails.length > 0 ? doc.thumbnails[doc.thumbnails.length - 1].url : undefined;

          // Fetch from the Drive API for a better thumbnail
          try {
            const apiUrl = `https://www.googleapis.com/drive/v3/files/${doc.id}?fields=thumbnailLink&key=${API_KEY}`;
            const response = await fetch(apiUrl, {
              headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            if (response.ok) {
              const fileMetadata = await response.json();
              if (fileMetadata.thumbnailLink) {
                // Request a larger thumbnail by modifying the URL
                thumbnail = fileMetadata.thumbnailLink.replace(/=s\d+/, "=s800");
              }
            }
          } catch (error) {
            console.error("Could not fetch high-quality thumbnail, using picker's default.", error);
          }

          const video = {
            title: doc.name,
            embedUrl: doc.embedUrl,
            thumbnail: thumbnail,
          };
          onVideoAdded(video);
        }
      })
      .build();
    picker.setVisible(true);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="video/*,image/*"
      />
      <Button variant="outline" onClick={handleUploadFromDevice}>
        Upload from this device
      </Button>
      <Button variant="outline" onClick={handleUploadFromDrive}>
        Upload from Google Drive
      </Button>
    </div>
  );
}
