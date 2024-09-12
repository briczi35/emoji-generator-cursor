'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Image from 'next/image';

export default function EmojiGenerator({ onNewEmoji }: { onNewEmoji: (url: string) => void }) {
  const [prompt, setPrompt] = useState('');
  const [generatedEmoji, setGeneratedEmoji] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateEmoji = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-emoji', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate emoji');
      }
      const data = await response.json();
      setGeneratedEmoji(data.url);
      onNewEmoji(data.url);
    } catch (error) {
      console.error('Error generating emoji:', error);
      setError('Failed to generate emoji. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Generate New Emoji</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Input
          type="text"
          placeholder="Enter your emoji prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={generateEmoji} disabled={isLoading} className="bg-blue-500 text-white">
          Generate
        </Button>
      </div>
      <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        ) : generatedEmoji ? (
          <Image src={generatedEmoji} alt="Generated Emoji" width={256} height={256} objectFit="contain" />
        ) : (
          <p className="text-gray-400 text-center">Your emoji will appear here</p>
        )}
      </div>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
}