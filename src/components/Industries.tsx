import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAdmin } from "../context/AdminContext";

export default function Industries() {
  const [images, setImages] = useState<{ url: string; id: string }[]>([]);
  const { isAdmin } = useAdmin();
  const [directUrl, setDirectUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "marquee_images"),
      orderBy("timestamp", "desc"),
      limit(10),
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: { url: string; id: string }[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data && data.url) docs.push({ url: data.url, id: docSnap.id });
        });
        if (docs.length > 0) setImages(docs);
        else {
          // Fallback to lookbook_doors if marquee_images is empty
          const q2 = query(
            collection(db, "lookbook_doors"),
            orderBy("timestamp", "desc"),
            limit(10),
          );
          onSnapshot(
            q2,
            (snap2) => {
              const docs2: { url: string; id: string }[] = [];
              snap2.forEach((docSnap) => {
                const data = docSnap.data();
                if (data && data.url)
                  docs2.push({ url: data.url, id: docSnap.id });
              });
              if (docs2.length > 0) setImages(docs2);
              else setImages(defaultImages);
            },
            () => setImages(defaultImages),
          );
        }
      },
      () => {
        setImages(defaultImages);
      },
    );
    return () => unsubscribe();
  }, []);

  const defaultImages = [
    { url: "https://i.postimg.cc/SNbCzy2J/20260623-120803.png", id: "def1" },
    { url: "https://i.postimg.cc/bwzn33Rb/20260623-120855.png", id: "def2" },
    { url: "https://i.postimg.cc/hGY74gRD/20260623-120934.png", id: "def3" },
    { url: "https://i.postimg.cc/L5tqV1Y8/20260623-121009.png", id: "def4" },
    { url: "https://i.postimg.cc/WpgJVQWv/20260623-121116.png", id: "def5" },
    { url: "https://i.postimg.cc/P5rLmNtv/20260623-121139.png", id: "def6" },
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  // Duplicate 4 times to ensure it covers even ultrawide screens for a seamless loop
  const marqueeImages = [
    ...displayImages,
    ...displayImages,
    ...displayImages,
    ...displayImages,
  ];

  const handleAddDirectLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directUrl.trim()) return;
    setUploading(true);
    try {
      const doorId = `marquee_${Date.now()}`;
      await setDoc(doc(db, "marquee_images", doorId), {
        url: directUrl.trim(),
        timestamp: Date.now(),
      });
      setDirectUrl("");
    } catch (error) {
      console.error("Error adding:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Delete all marquee images?")) return;
    try {
      const querySnapshot = await getDocs(collection(db, "marquee_images"));
      querySnapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "marquee_images", docSnap.id));
      });
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <section className="bg-black w-full overflow-hidden pt-[18px] pb-[8px] m-0 flex items-center justify-center relative">
      <div className="flex w-max h-[480px] items-center">
        <motion.div
          key={displayImages.map((img) => img.id).join(",")}
          animate={{ x: ["0%", "-25%"] }}
          transition={{
            ease: "linear",
            duration: displayImages.length * 4.5,
            repeat: Infinity,
          }}
          className="flex gap-0 h-[480px] will-change-transform"
        >
          {marqueeImages.map((img, i) => (
            <div
              key={i}
              className="h-[480px] aspect-[1/2.15] shrink-0"
            >
              <img
                src={img.url}
                className="w-full h-full object-cover"
                alt="Door"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white p-6 rounded-2xl shadow-2xl border border-black/10 w-[90%] max-w-md"
          >
            <div className="text-sm font-bold uppercase tracking-widest text-[#18C654] mb-4 text-center">
              Home Marquee Admin
            </div>
            <form
              onSubmit={handleAddDirectLink}
              className="flex flex-col gap-3"
            >
              <input
                type="url"
                required
                value={directUrl}
                onChange={(e) => setDirectUrl(e.target.value)}
                placeholder="Image URL (https://i.postimg.cc/...)"
                className="w-full px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 focus:border-[#18C654] outline-none text-sm text-black"
              />
              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-[#18C654] text-white font-bold py-2 rounded-full uppercase tracking-widest text-xs hover:bg-[#15b04a] transition-colors"
              >
                {uploading ? "Adding..." : "Add to Marquee"}
              </button>
              <button
                type="button"
                onClick={handleDeleteAll}
                className="w-full bg-red-500 text-white font-bold py-2 rounded-full uppercase tracking-widest text-xs hover:bg-red-600 transition-colors mt-2"
              >
                Clear Custom Images
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
