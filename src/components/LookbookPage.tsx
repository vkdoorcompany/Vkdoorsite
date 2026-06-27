import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, X, Share2, Plus, LoaderIcon, RefreshCw } from "lucide-react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db, handleFirebaseError, OperationType } from "../firebase";
import { useAdmin } from "../context/AdminContext";

interface DoorImage {
  id: string; // e.g. "VK 101"
  url: string; // Direct image URL
  storagePath: string; // For compatibility
  timestamp: number;
}

const DEFAULT_LOOKBOOK_IMAGES: DoorImage[] = [
  {
    id: "VK 101",
    url: "https://i.postimg.cc/SNbCzy2J/20260623-120803.png",
    storagePath: "",
    timestamp: 1700000000001,
  },
  {
    id: "VK 102",
    url: "https://i.postimg.cc/bwzn33Rb/20260623-120855.png",
    storagePath: "",
    timestamp: 1700000000002,
  },
  {
    id: "VK 103",
    url: "https://i.postimg.cc/hGY74gRD/20260623-120934.png",
    storagePath: "",
    timestamp: 1700000000003,
  },
  {
    id: "VK 104",
    url: "https://i.postimg.cc/L5tqV1Y8/20260623-121009.png",
    storagePath: "",
    timestamp: 1700000000004,
  },
  {
    id: "VK 105",
    url: "https://i.postimg.cc/WpgJVQWv/20260623-121116.png",
    storagePath: "",
    timestamp: 1700000000005,
  },
  {
    id: "VK 106",
    url: "https://i.postimg.cc/P5rLmNtv/20260623-121139.png",
    storagePath: "",
    timestamp: 1700000000006,
  },
];

const ImageLoad = ({
  src,
  alt,
  id,
  onClick,
  index = 10,
}: {
  src: string;
  alt: string;
  id?: string;
  onClick?: () => void;
  index?: number;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative w-full h-auto bg-transparent cursor-pointer overflow-hidden rounded-xl"
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        referrerPolicy="no-referrer"
        className={`w-full h-auto object-contain transition-opacity duration-700 relative z-10 ${loaded ? "opacity-100" : "opacity-0"}`}
        loading={index < 6 ? "eager" : "lazy"}
        fetchPriority={index < 4 ? "high" : "auto"}
        decoding="async"
      />
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center min-h-[150px] bg-zinc-50 z-0">
          <svg className="w-8 h-8 text-zinc-300 animate-pulse mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19V6a2 2 0 012-2h12a2 2 0 012 2v13m-6-5v5m-4-5v5" />
          </svg>
          {id && <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase animate-pulse">{id}</span>}
        </div>
      )}
    </div>
  );
};

export default function LookbookPage() {
  const [images, setImages] = useState<DoorImage[]>([]);
  const { isAdmin, setIsAdmin, showPinPrompt } = useAdmin();
  const [errorMsg, setErrorMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<DoorImage | null>(null);
  const [directUrl, setDirectUrl] = useState("");
  const [customCode, setCustomCode] = useState("");

  const lastClickRef = useRef<{ [key: string]: number }>({});
  const clickTimeoutRef = useRef<{ [key: string]: any }>({});

  const handleItemClick = (img: DoorImage) => {
    if (isAdmin) {
      const now = Date.now();
      const lastClick = lastClickRef.current[img.id] || 0;
      if (now - lastClick < 350) {
        // Double click / double tap detected!
        const pendingTimeout = clickTimeoutRef.current[img.id];
        if (pendingTimeout) {
          clearTimeout(pendingTimeout);
          clickTimeoutRef.current[img.id] = null;
        }
        handleDelete(img.id);
        lastClickRef.current[img.id] = 0;
      } else {
        lastClickRef.current[img.id] = now;
        const timeout = setTimeout(() => {
          setSelectedImage(img);
          clickTimeoutRef.current[img.id] = null;
        }, 300);
        clickTimeoutRef.current[img.id] = timeout;
      }
    } else {
      setSelectedImage(img);
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "lookbook_doors"),
      orderBy("timestamp", "desc"),
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: DoorImage[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data && data.id && data.url) {
            docs.push(data as DoorImage);
          }
        });
        if (docs.length > 0) {
          setImages(docs);
        } else {
          setImages(DEFAULT_LOOKBOOK_IMAGES);
        }
      },
      (error) => {
        handleFirebaseError(error, OperationType.GET, "lookbook_doors");
        setImages(DEFAULT_LOOKBOOK_IMAGES);
      },
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      const preventZoom = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      };

      let lastTouchEnd = 0;
      const preventDoubleTap = (e: TouchEvent) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      };

      document.addEventListener("touchstart", preventZoom, { passive: false });
      document.addEventListener("touchmove", preventZoom, { passive: false });
      document.addEventListener("touchend", preventDoubleTap, {
        passive: false,
      });

      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("touchstart", preventZoom);
        document.removeEventListener("touchmove", preventZoom);
        document.removeEventListener("touchend", preventDoubleTap);
        document.body.style.overflow = "";
      };
    }
  }, [selectedImage]);

  const getNextCode = () => {
    let nextNum = 101;
    if (images && images.length > 0) {
      const ids = images.map((img) => {
        if (!img || typeof img.id !== "string") return 0;
        const match = img.id.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
      });
      const validIds = ids.filter((id) => !isNaN(id));
      if (validIds.length > 0) {
        nextNum = Math.max(...validIds) + 1;
      }
    }
    return `VK ${nextNum}`;
  };

  const handleAddDirectLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directUrl.trim()) return;

    setUploading(true);
    setErrorMsg("");

    try {
      const doorId = customCode.trim() || getNextCode();

      const doorData: DoorImage = {
        id: doorId,
        url: directUrl.trim(),
        storagePath: "",
        timestamp: Date.now(),
      };

      await setDoc(doc(db, "lookbook_doors", doorId), doorData);
      setDirectUrl("");
      setCustomCode("");
    } catch (error) {
      console.error("Error adding direct link:", error);
      setErrorMsg("Failed to add design. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        `Are you sure you want to delete ${id}? / क्या आप वाकई इसे डिलीट करना चाहते हैं?`,
      )
    ) {
      try {
        await deleteDoc(doc(db, "lookbook_doors", id));
      } catch (error) {
        handleFirebaseError(
          error,
          OperationType.DELETE,
          `lookbook_doors/${id}`,
        );
        console.error("Delete error:", error);
      }
    }
  };

  const handleShare = (id: string, url: string) => {
    const text = `Hello VK DOOR,\nI'm interested in this door design code: ${id}`;
    window.open(
      `https://wa.me/919050050120?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-bg relative selection:bg-brand selection:text-white">
      <div className="pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Typographical Editorial Header */}
        <div className="grid md:grid-cols-12 gap-8 items-start justify-between pb-12 border-b border-divider/60 mb-16">
          <div className="md:col-span-8">
            <h1 className="text-[2.2rem] sm:text-[4.5rem] uppercase tracking-tighter font-black text-ink leading-[0.95]">
              Design exhibition
              <br />
              <span className="text-zinc-400 font-light italic text-[0.95em]">
                Lookbook
              </span>
            </h1>
          </div>
          <div className="md:col-span-4 flex flex-col md:items-end md:text-right gap-2 md:pt-14">
            <p className="text-sm font-medium text-zinc-500 max-w-md select-none leading-relaxed">
              Interact with each piece to explore fine details, or tap/hold to
              share your selected via{" "}
              <span
                onClick={() => {
                  if (isAdmin) {
                    setIsAdmin(false);
                  } else {
                    showPinPrompt();
                  }
                }}
                className="text-[#25D366] font-semibold cursor-pointer hover:opacity-80 transition-opacity select-none"
              >
                WhatsApp
              </span>
            </p>
          </div>
        </div>

        {/* Admin Controls */}
        <AnimatePresence>
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 bg-white p-6 sm:p-8 rounded-[2rem] shadow-xl border border-black/5 flex flex-col items-center w-full"
            >
              <div className="text-xl font-bold uppercase tracking-widest text-[#18C654] mb-4 flex items-center gap-2">
                Control Dashboard (Lookbook)
              </div>
              <p className="text-xs text-zinc-500 mb-6 font-mono text-center max-w-md">
                Tip: Double click or double tap any door thumbnail card design
                to delete it.
              </p>

              <form
                onSubmit={handleAddDirectLink}
                className="w-full max-w-xl flex flex-col gap-5"
              >
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
                    Image Link / URL
                  </label>
                  <input
                    type="url"
                    required
                    value={directUrl}
                    onChange={(e) => setDirectUrl(e.target.value)}
                    placeholder="https://i.postimg.cc/..."
                    className="w-full px-5 py-3 rounded-full bg-zinc-50 border border-zinc-200 focus:border-[#18C654] focus:outline-none transition-colors font-medium text-sm text-zinc-800"
                  />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
                    Design Code (Optional - e.g. VK 102)
                  </label>
                  <input
                    type="text"
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value)}
                    placeholder={getNextCode()}
                    className="w-full px-5 py-3 rounded-full bg-zinc-50 border border-zinc-200 focus:border-[#18C654] focus:outline-none transition-colors font-medium text-sm text-zinc-800"
                  />
                </div>

                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={uploading || !directUrl}
                    className="w-full flex items-center justify-center gap-2 bg-black hover:bg-[#18C654] text-white px-6 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-xl disabled:opacity-50 pointer-events-auto cursor-pointer"
                  >
                    {uploading ? (
                      <>
                        <LoaderIcon className="animate-spin" size={16} />{" "}
                        Processing...
                      </>
                    ) : (
                      <>
                        <Plus size={16} /> Add Design Link
                      </>
                    )}
                  </button>
                </div>
                {errorMsg && (
                  <p className="text-red-500 text-xs text-center font-semibold mt-2">
                    {errorMsg}
                  </p>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Asymmetrical premium grid - Exactly 2 elements per row on all display screen sizes */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 pb-20">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.05,
              }}
              className="group relative overflow-hidden h-auto flex flex-col cursor-pointer bg-transparent rounded-xl"
              onClick={() => handleItemClick(img)}
            >
              <div className="w-full h-auto transform group-hover:scale-[1.04] transition-transform duration-[1.2s] ease-[0.16, 1, 0.3, 1] rounded-xl overflow-hidden bg-transparent">
                <ImageLoad src={img.url} alt={`Door ${img.id}`} id={img.id} index={i} />
              </div>

              {/* Micro floating item tag */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <div className="bg-black/85 backdrop-blur-md px-3 py-1 sm:py-1.5 rounded-full border border-white/10 text-white font-mono text-[9px] sm:text-[11px] tracking-widest uppercase transition-all duration-300 group-hover:bg-[#18C654] group-hover:border-transparent">
                  {img.id}
                </div>
              </div>

              {/* High class gradient and slide overlay - Only active for pointer interactions on desktop hover, completely transparent on mobile touch */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col justify-end p-4 sm:p-6 pointer-events-none md:group-hover:pointer-events-auto rounded-xl">
                <div className="flex justify-between items-end w-full pointer-events-auto">
                  <div className="flex flex-col text-left">
                    <span className="text-white/60 font-mono text-[9px] tracking-wider uppercase mb-0.5">
                      Architectural Craft
                    </span>
                    <span className="text-white font-black text-base sm:text-2xl leading-none tracking-tight">
                      {img.id}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(img.id, img.url);
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#18C654] hover:bg-[#15A646] text-white flex items-center gap-1.5 shadow-lg scale-90 sm:scale-100 hover:scale-105 transition-all font-bold tracking-tight text-[10px] uppercase pointer-events-auto cursor-pointer"
                      title="Share on WhatsApp"
                    >
                      <svg
                        className="w-3.5 h-3.5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                      </svg>
                      <span className="hidden sm:inline">WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-20 text-zinc-400 font-mono text-sm tracking-widest uppercase">
            Collection curated soon.
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed left-1/2 -translate-x-1/2 top-0 bottom-0 z-[200] w-full max-w-[480px] h-full bg-black/98 backdrop-blur-md flex flex-col"
          >
            {/* Dynamic Top Bar */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 absolute top-0 w-full z-10">
              <div className="flex flex-col text-left">
                <span className="text-white font-bold tracking-tight">
                  {selectedImage.id}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleShare(selectedImage.id, selectedImage.url)
                  }
                  className="flex items-center gap-1.5 text-white bg-[#18C654] hover:bg-[#15A646] px-3.5 py-1.5 rounded-full font-bold tracking-tight text-[11px] uppercase hover:scale-105 transition-all shadow-[0_2px_8px_rgba(24,198,84,0.35)] pointer-events-auto cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 fill-current mr-0.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                  </svg>
                  <span>WhatsApp Share</span>
                </button>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="flex items-center gap-1.5 text-white bg-white/10 hover:bg-red-600 px-3.5 py-1.5 rounded-full font-bold tracking-tight text-[11px] uppercase hover:scale-105 transition-all pointer-events-auto cursor-pointer"
                >
                  <X size={16} />{" "}
                  <span className="hidden sm:inline">CLOSE</span>
                </button>
              </div>
            </div>

            {/* Center display element */}
            <div
              className="flex-1 flex flex-col items-center justify-center p-4 sm:p-12 relative overflow-hidden mt-16"
              style={{ touchAction: "none" }}
            >
              <div
                className="relative max-w-full max-h-[82vh]"
                style={{ touchAction: "none" }}
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.id}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain select-none pointer-events-none md:pointer-events-auto"
                  style={{
                    imageRendering: "auto",
                    transform: "translate3d(0, 0, 0)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                    touchAction: "none",
                  }}
                />
              </div>

              <div className="mt-8 flex flex-col items-center text-center gap-1">
                <h3 className="text-zinc-400 text-sm sm:text-base tracking-widest uppercase font-mono">
                  <span className="font-bold text-white tracking-widest">
                    Copyright. Luxmi (LK)
                  </span>
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
