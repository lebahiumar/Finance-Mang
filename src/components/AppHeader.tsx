
"use client";

import { useState, useEffect } from "react";
import { Wallet, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppHeader() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('finTrackTheme') as 'light' | 'dark' | null;
    // Ensure this runs only on the client
    if (typeof window !== 'undefined') {
        const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = storedTheme || preferredTheme;
        setTheme(initialTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('finTrackTheme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Wallet className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-headline font-semibold text-primary">
            FinTrack
          </h1>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleTheme} 
          aria-label="Toggle theme"
          className="hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}

