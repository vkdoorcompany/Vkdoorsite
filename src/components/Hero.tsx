import { motion } from 'motion/react';
import { useAdmin } from '../context/AdminContext';

export default function Hero() {
  const { showPinPrompt, isAdmin, setIsAdmin } = useAdmin();

  return (
    <section id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden bg-black">
      
      <div className="relative z-10 w-full px-6 sm:px-16 pt-32 sm:pt-[clamp(6.5rem,16vh,12rem)]">
        <motion.h1 
          className="max-w-full text-[clamp(4.5rem,15vw,8rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.3)] sm:text-[clamp(6rem,12vw,12rem)] md:text-[clamp(7rem,11vw,11rem)] flex flex-col"
         
        >
          <motion.span 
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="block"
          >
            Premium
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="block"
          >
            Doors
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="block text-zinc-400 font-light italic text-[0.95em] [text-shadow:0_2px_32px_rgba(0,0,0,0.4)]"
           
          >
            Timeless Design
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 w-full flex justify-start sm:justify-start md:justify-start relative z-50 pointer-events-auto"
        >
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white/90 tracking-widest uppercase flex flex-wrap items-center gap-y-2 gap-x-3 sm:gap-x-5">
            <span className="whitespace-nowrap">Premium Wooden Doors & Windows</span> 
            <span className="opacity-50">•</span> 
            <span className="whitespace-nowrap">Mouldings</span> 
            <span className="opacity-50">•</span> 
            <span 
              onClick={() => {
                if (isAdmin) {
                  setIsAdmin(false);
                } else {
                  showPinPrompt();
                }
              }}
              className="cursor-pointer hover:text-white transition-all select-none relative z-50 pointer-events-auto whitespace-nowrap decoration-zinc-500 hover:underline underline-offset-4"
              title={isAdmin ? "Admin Active: Click to Logout" : "Click to authenticate"}
            >
              Frames
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
