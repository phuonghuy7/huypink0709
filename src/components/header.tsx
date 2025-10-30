'use client';

import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Button } from './ui/button';

export function Header() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect to login page after successful sign out
      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <h1 className="text-2xl font-bold">My Videos</h1>
      <div className="flex items-center space-x-2">
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </header>
  );
}
