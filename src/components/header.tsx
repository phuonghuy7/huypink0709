"use client";

import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <h1 className="text-2xl font-bold">My Videos</h1>
      <div className="flex items-center space-x-2">
        <Button variant="outline">Sign Out</Button>
      </div>
    </header>
  );
}
