'use client';

import Image from 'next/image';
import { Button } from './ui/button';

type Emoji = {
  id: number;
  url: string;
  likes: number;
};

interface EmojiGridProps {
  emojis: Emoji[];
  onLike: (id: number) => void;
}

export default function EmojiGrid({ emojis, onLike }: EmojiGridProps) {
  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'emoji.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Generated Emojis</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {emojis.map((emoji) => (
          <div key={emoji.id} className="relative group aspect-square">
            <Image src={emoji.url} alt="Emoji" layout="fill" objectFit="cover" className="rounded-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button size="sm" variant="secondary" onClick={() => handleDownload(emoji.url)} className="bg-white text-black">
                ⬇️
              </Button>
              <Button size="sm" variant="secondary" onClick={() => onLike(emoji.id)} className="bg-white text-black">
                ❤️ {emoji.likes}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}