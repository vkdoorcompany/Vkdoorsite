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
import { Trash2 } from "lucide-react";

const defaultImages = [
  { url: "https://i.postimg.cc/SNbCzy2J/20260623-120803.png", id: "def1" },
  { url: "https://i.postimg.cc/bwzn33Rb/20260623-120855.png", id: "def2" },
  { url: "https://i.postimg.cc/hGY74gRD/20260623-120934.png", id: "def3" },
  { url: "https://i.postimg.cc/L5tqV1Y8/20260623-121009.png", id: "def4" },
  { url: "https://i.postimg.cc/WpgJVQWv/20260623-121116.png", id: "def5" },
  { url: "https://i.postimg.cc/P5rLmNtv/20260623-121139.png", id: "def6" },
];

export default function Industries() {
  const [images, setImages] = useState<{ url: string; id: string }[]>(() => {
    try {
      const cached = localStorage.getItem("vk_marquee_images");
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.error("Failed to load marquee cache:", e);
    }
    return defaultImages;
  });
  const { isAdmin } = useAdmin();
  const [directUrl, setDirectUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Clear inputs and loader states when closing/reopening admin
  useEffect(() => {
    if (!isAdmin) {
      setDirectUrl("");
      setUploading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    const q = query(
      collection(db, "marquee_images"),
      orderBy("timestamp", "desc"),
      limit(20),
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const customDocs: { url: string; id: string }[] = [];
        const deletedIds = new Set<string>();

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data) {
            if (data.deleted === true) {
              deletedIds.add(docSnap.id);
            } else if (data.url) {
              customDocs.push({ url: data.url, id: docSnap.id });
            }
          }
        });

        // Combine custom marquee images with defaults that are not deleted
        const activeDefaults = defaultImages.filter((d) => !deletedIds.has(d.id));
        const merged = [...customDocs, ...activeDefaults];
        const finalImages = merged.length > 0 ? merged : defaultImages;

        try {
          localStorage.setItem("vk_marquee_images", JSON.stringify(finalImages));
        } catch (e) {
          console.error("Failed to cache marquee images:", e);
        }
        setImages(finalImages);
      },
      () => {
        try {
          const cached = localStorage.getItem("vk_marquee_images");
          if (cached) {
            setImages(JSON.parse(cached));
            return;
          }
        } catch (e) {
          console.error(e);
        }
        setImages(defaultImages);
      },
    );
    return () => unsubscribe();
  }, []);

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

  const handleDeleteSingle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this marquee image? / क्या आप वाकई इसे डिलीट करना चाहते हैं?")) return;
    try {
      const isDefault = defaultImages.some((d) => d.id === id);
      if (isDefault) {
        // Mark default image as deleted in Firestore so it is filtered out
        await setDoc(doc(db, "marquee_images", id), {
          deleted: true,
          timestamp: Date.now(),
        });
      } else {
        // Delete custom image completely
        await deleteDoc(doc(db, "marquee_images", id));
      }
    } catch (error) {
      console.error("Error deleting marquee image:", error);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Delete all marquee images and restore defaults?")) return;
    try {
      const querySnapshot = await getDocs(collection(db, "marquee_images"));
      for (const docSnap of querySnapshot.docs) {
        await deleteDoc(doc(db, "marquee_images", docSnap.id));
      }
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
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white p-6 rounded-2xl shadow-2xl border border-black/10 w-[90%] max-w-md max-h-[80vh] overflow-y-auto"
          >
            <div className="text-sm font-bold uppercase tracking-widest text-[#18C654] mb-3 text-center">
              Home Marquee Admin
            </div>

            {/* List of current active marquee images for management */}
            <div className="mb-4 max-h-36 overflow-y-auto border border-zinc-200 rounded-lg p-2 flex flex-col gap-1.5 bg-zinc-50">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                Manage Active Images ({displayImages.length})
              </span>
              {displayImages.map((img) => {
                const isDefault = defaultImages.some((d) => d.id === img.id);
                return (
                  <div key={img.id} className="flex items-center justify-between gap-2 p-1.5 hover:bg-zinc-100 rounded transition-colors">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img src={img.url} className="w-8 h-8 object-cover rounded border border-zinc-200" alt="thumbnail" referrerPolicy="no-referrer" />
                      <span className="text-[11px] font-mono truncate text-zinc-600">
                        {isDefault ? `Default (${img.id})` : `Custom (${img.id.slice(-6)})`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleDeleteSingle(img.id);
                      }}
                      className="relative z-50 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-all cursor-pointer pointer-events-auto flex items-center justify-center"
                      title="Delete Image"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                );
              })}
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
                className="w-full bg-red-500 text-white font-bold py-2 rounded-full uppercase tracking-widest text-xs hover:bg-red-600 transition-colors mt-1"
              >
                Restore Default Images
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
