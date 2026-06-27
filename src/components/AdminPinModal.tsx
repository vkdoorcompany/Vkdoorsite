import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function AdminPinModal() {
  const { pinDialog, setPinDialog, setIsAdmin } = useAdmin();
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const checkPin = () => {
    if (pinInput === '2005') {
      setIsAdmin(true);
      setPinDialog(false);
      setPinInput('');
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect PIN');
      setPinInput('');
    }
  };

  return (
    <AnimatePresence>
      {pinDialog && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full relative shadow-2xl text-ink"
          >
            <button 
              onClick={() => {
                setPinDialog(false);
                setErrorMsg('');
                setPinInput('');
              }} 
              className="absolute top-4 right-4 text-zinc-400 hover:text-black cursor-pointer"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-center text-black">
              Admin Access
            </h3>
            <p className="text-xs text-zinc-500 text-center mb-6 font-medium tracking-wider uppercase">
              Authorization Required
            </p>
            
            <input 
              type="password" 
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="••••"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-4 text-center text-3xl font-black tracking-[0.5em] mb-4 focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-black placeholder:text-zinc-300"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  checkPin();
                }
              }}
            />
            
            {errorMsg && (
              <p className="text-red-600 text-xs text-center mb-4 font-bold uppercase tracking-wide">
                {errorMsg}
              </p>
            )}
            
            <button 
              onClick={checkPin}
              className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-brand transition-colors cursor-pointer"
            >
              Verify
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
