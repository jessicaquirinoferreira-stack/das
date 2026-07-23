import React from 'react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const InstagramFeed: React.FC = () => {
  const { settings } = useStore();

  const posts = [
    {
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      likes: "1.2k",
      comments: "84"
    },
    {
      img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
      likes: "2.4k",
      comments: "142"
    },
    {
      img: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=600&q=80",
      likes: "980",
      comments: "63"
    },
    {
      img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      likes: "1.8k",
      comments: "98"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#2C221E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <a
            href={settings.instagram || "https://instagram.com/duamodas"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B87D7B] hover:underline mb-2"
          >
            <Instagram className="w-4 h-4" /> @duamodas no Instagram
          </a>
          <h2 className="font-serif-luxury text-3xl font-bold text-[#2C221E] dark:text-[#F8F5F2]">
            Siga Nosso Feed de Inspirações
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={settings.instagram || "https://instagram.com/duamodas"}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm"
            >
              <img
                src={post.img}
                alt="Feed Dua Modas"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-xs">
                <span className="flex items-center gap-1"><Heart className="w-4 h-4 fill-current" /> {post.likes}</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4 fill-current" /> {post.comments}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
