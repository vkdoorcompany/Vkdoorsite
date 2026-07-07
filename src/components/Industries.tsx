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

const defaultImages = [
  { url: "https://i.postimg.cc/SNbCzy2J/20260623-120803.png", id: "def1" },
  { url: "https://i.postimg.cc/bwzn33Rb/20260623-120855.png", id: "def2" },
  { url: "https://i.postimg.cc/hGY74gRD/20260623-120934.png", id: "def3" },
  { url: "https://i.postimg.cc/L5tqV1Y8/20260623-121009.png", id: "def4" },
  { url: "https://i.postimg.cc/WpgJVQWv/20260623-121116.png", id: "def5" },
  { url: "https://i.postimg.cc/P5rLmNtv/20260623-121139.png", id: "def6" },
];

export default function Industries() {
  const [images, setImages] = useState<{ url: string; id: string }[]>(defaultImages);
  const { isAdmin } = useAdmin();
  const [directUrl, setDirectUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Clear inputs and loader states when closing/reopening admin
  useEffect(() => {
    if (!isAdmin) {
      setDirectUrl("");
      setUploading(false);
      setErrorMsg("");
    }
  }, [isAdmin]);

  useEffect(() => {
    // 1. First, load from localStorage to populate the UI instantly on mount
    const savedMarquee = localStorage.getItem("vk_marquee_images");
    if (savedMarquee) {
      try {
        const parsed = JSON.parse(savedMarquee) as { url: string; id: string; deleted?: boolean }[];
        const customDocs = parsed.filter(d => d.id && d.url && !d.deleted);
        const deletedIds = new Set(parsed.filter(d => d.deleted).map(d => d.id));
        
        const activeDefaults = defaultImages.filter((d) => !deletedIds.has(d.id));
        const merged = [...customDocs, ...activeDefaults];
        const finalImages = merged.length > 0 ? merged : defaultImages;
        setImages(finalImages);
      } catch (e) {
        console.error("Failed to parse saved marquee:", e);
      }
    }

    // 2. Set up Firestore snapshot listener
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

        // Save these to localStorage for persistence backup
        const allMarqueeItems: any[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data) {
            allMarqueeItems.push({ id: docSnap.id, ...data });
          }
        });
        if (allMarqueeItems.length > 0) {
          localStorage.setItem("vk_marquee_images", JSON.stringify(allMarqueeItems));
        }

        // Combine custom marquee images with defaults that are not deleted
        const activeDefaults = defaultImages.filter((d) => !deletedIds.has(d.id));
        const merged = [...customDocs, ...activeDefaults];
        const finalImages = merged.length > 0 ? merged : defaultImages;

        setImages(finalImages);
      },
      () => {
        // Fallback already handled by localStorage
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!directUrl.trim()) {
      setErrorMsg("Please enter a valid image URL. / कृपया एक मान्य इमेज यूआरएल दर्ज करें।");
      return;
    }

    setUploading(true);
    try {
      const doorId = `marquee_${Date.now()}`;
      const newImg = { url: directUrl.trim(), id: doorId };

      // 1. Optimistic state update
      setImages((prev) => {
        const filtered = prev.filter(img => img.id !== doorId);
        return [newImg, ...filtered];
      });

      // 2. Save to localStorage backup
      try {
        const savedMarquee = localStorage.getItem("vk_marquee_images");
        let parsed: any[] = savedMarquee ? JSON.parse(savedMarquee) : [];
        parsed = parsed.filter(p => p.id !== doorId);
        parsed.push({ id: doorId, url: directUrl.trim(), timestamp: Date.now() });
        localStorage.setItem("vk_marquee_images", JSON.stringify(parsed));
      } catch (e) {
        console.error("Local storage marquee save error:", e);
      }

      // 3. Trigger write to Firestore (resolves instantly due to persistent local cache, syncs in background)
      await setDoc(doc(db, "marquee_images", doorId), {
        url: directUrl.trim(),
        timestamp: Date.now(),
      });

      // Instantly clear the url and uploading state
      setDirectUrl("");
      setUploading(false);
    } catch (error: any) {
      console.error("Error adding direct link:", error);
      setErrorMsg("Failed to add link: " + error.message);
      setUploading(false);
    }
  };

  const handleDeleteSingle = async (id: string) => {
    // Optimistic UI update: instantly remove from state to ensure < 2s removal
    setImages((prev) => prev.filter((img) => img.id !== id));

    // Update localStorage fallback
    try {
      const savedMarquee = localStorage.getItem("vk_marquee_images");
      let parsed: any[] = savedMarquee ? JSON.parse(savedMarquee) : [];
      const isDefault = defaultImages.some((d) => d.id === id);
      
      if (isDefault) {
        parsed = parsed.filter(p => p.id !== id);
        parsed.push({
          id: id,
          deleted: true,
          timestamp: Date.now()
        });
      } else {
        parsed = parsed.filter(p => p.id !== id);
      }
      localStorage.setItem("vk_marquee_images", JSON.stringify(parsed));
    } catch (e) {
      console.error("Local storage delete single error:", e);
    }

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
    
    // Clear localStorage
    localStorage.removeItem("vk_marquee_images");
    setImages(defaultImages);

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
    <div className="w-full flex flex-col bg-black">
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
                className="h-[480px] aspect-[1/2.15] shrink-0 font-mono relative group"
              >
                <img
                  src={img.url}
                  className="w-full h-full object-cover select-none"
                  alt="VK Premium Door design repeat loop"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Admin Controls - Premium Black Theme */}
      <AnimatePresence>
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-zinc-950 px-6 py-10 sm:py-16 border-t border-zinc-900 text-left flex flex-col items-center"
          >
            <div className="w-full max-w-2xl flex flex-col gap-8">
              <div className="border-b border-zinc-900 pb-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-white font-sans">
                  MANAGE HOMEPAGE SLIDER
                </h3>
              </div>

              {/* Active list with 1-click delete */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">
                  Active Images ({displayImages.length})
                </span>
                <div className="max-h-48 overflow-y-auto border border-zinc-900 rounded-xl p-3 bg-zinc-900/50 flex flex-col gap-2">
                  {displayImages.map((img) => {
                    const isDefault = defaultImages.some((d) => d.id === img.id);
                    return (
                      <div
                        key={img.id}
                        className="flex items-center justify-between gap-4 p-2.5 bg-zinc-950 rounded-lg border border-zinc-900"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img
                            src={img.url}
                            className="w-10 h-10 object-cover rounded border border-zinc-800"
                            alt="thumbnail"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-xs text-zinc-400 font-mono truncate">
                            {isDefault ? `Default Design` : `Custom Design (${img.id.slice(-6)})`}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleDeleteSingle(img.id);
                          }}
                          className="text-red-500 hover:text-red-400 hover:bg-red-950/20 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Direct link input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">
                    Direct Image Link
                  </label>
                  <input
                    type="url"
                    value={directUrl || ""}
                    onChange={(e) => setDirectUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-5 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-all font-medium text-sm"
                  />
                </div>

                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-950/40 text-red-400 border border-red-900/50 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={uploading || !directUrl}
                  className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-xl uppercase tracking-widest text-[11px] transition-colors cursor-pointer disabled:opacity-40"
                >
                  {uploading ? "Saving..." : "Add to Slider"}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
