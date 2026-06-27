import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface DoorImage {
  id: string;
  url: string;
}

const DEFAULT_SLIDES: DoorImage[] = [
  { id: 'VK 101', url: 'https://i.postimg.cc/SNbCzy2J/20260623-120803.png' },
  { id: 'VK 102', url: 'https://i.postimg.cc/bwzn33Rb/20260623-120855.png' },
  { id: 'VK 103', url: 'https://i.postimg.cc/hGY74gRD/20260623-120934.png' },
  { id: 'VK 104', url: 'https://i.postimg.cc/L5tqV1Y8/20260623-121009.png' },
  { id: 'VK 105', url: 'https://i.postimg.cc/WpgJVQWv/20260623-121116.png' },
  { id: 'VK 106', url: 'https://i.postimg.cc/P5rLmNtv/20260623-121139.png' }
];

export default function LookbookSlider() {
  const [images, setImages] = useState<DoorImage[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'lookbook_doors'), orderBy('timestamp', 'desc'), limit(6));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs: DoorImage[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data && data.id && data.url) {
          docs.push(data as DoorImage);
        }
      });
      if (docs.length > 0) {
        setImages(docs);
      } else {
        setImages(DEFAULT_SLIDES);
      }
    }, (error) => {
      console.error("Failed to load lookbook slider:", error);
      setImages(DEFAULT_SLIDES);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <section className="bg-bg py-24 sm:py-32 overflow-hidden border-t border-divider/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-16 mb-12 flex justify-between items-end">
         <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-ink uppercase tracking-tighter">
            Curated <span className="text-zinc-400 font-light italic text-[0.95em]">Designs</span>
         </h2>
      </div>
      
      <div className="w-full relative px-4 sm:px-16 mx-auto max-w-screen-2xl">
         <div className="overflow-hidden rounded-[2rem] shadow-xl aspect-[3/4] sm:aspect-[21/9] bg-white border border-black/5 relative">
            <motion.div
               animate={{ x: `-${page * 100}%` }}
               transition={{ type: "spring", stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
               className="flex h-full w-full"
            >
               {images.map((img) => (
                 <div key={img.id} className="min-w-full h-full relative" style={{ width: '100%' }}>
                    <ImageLoad src={img.url} alt={img.id} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 sm:p-12 flex flex-col justify-end">
                       <span className="text-white font-black text-2xl sm:text-4xl tracking-tighter drop-shadow-md">
                          {img.id}
                       </span>
                    </div>
                 </div>
               ))}
            </motion.div>
         </div>

         <div className="flex justify-center gap-2 mt-8">
            {images.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setPage(i)}
                className={`w-16 h-1.5 rounded-full transition-colors cursor-pointer ${page === i ? 'bg-brand' : 'bg-black/10'}`} 
              />
            ))}
         </div>
      </div>
    </section>
  );
}

const ImageLoad = ({ src, alt }: { src: string, alt: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-black/5 flex items-center justify-center">
      <img 
        src={src} 
        alt={alt} 
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover sm:object-contain object-bottom sm:object-center transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`} 
        loading="lazy"
        decoding="async"
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-8 h-8 rounded-full border-4 border-brand/30 border-t-brand animate-spin" />
        </div>
      )}
    </div>
  );
};
