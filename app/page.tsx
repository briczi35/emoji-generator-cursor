'use client';

import { useState } from 'react';
import EmojiGenerator from "../components/emoji-generator";
import EmojiGrid from "../components/emoji-grid";

type Emoji = {
  id: number;
  url: string;
  likes: number;
};

export default function Home() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  const handleNewEmoji = (url: string) => {
    const newEmoji: Emoji = {
      id: Date.now(),
      url,
      likes: 0,
    };
    setEmojis([newEmoji, ...emojis]);
  };

  const handleLike = (id: number) => {
    setEmojis(emojis.map(emoji => 
      emoji.id === id ? { ...emoji, likes: emoji.likes + 1 } : emoji
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 font-sans text-black">
      <main className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center">Emoji Maker</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <EmojiGenerator onNewEmoji={handleNewEmoji} />
          </div>
          <div className="lg:w-1/2">
            <EmojiGrid emojis={emojis} onLike={handleLike} />
          </div>
        </div>
      </main>
    </div>
  );
}
