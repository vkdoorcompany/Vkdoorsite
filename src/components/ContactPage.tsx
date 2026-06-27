import { motion } from 'motion/react';
import { Phone, Navigation, Share2, Factory, Store, MessageCircle, Truck, Mail } from 'lucide-react';
import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', req: '', location: '' });

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello VK DOOR\nName: ${formData.name}\nMobile: ${formData.phone}\nLocation: ${formData.location}\nRequirement: ${formData.req}`;
    try {
      const newWin = window.open(`https://wa.me/919050050120?text=${encodeURIComponent(text)}`, '_blank');
      if (!newWin) {
        window.location.href = `https://wa.me/919050050120?text=${encodeURIComponent(text)}`;
      }
    } catch (err) {
      console.warn("window.open blocked or failed in sandbox iframe. Navigating in-frame instead:", err);
      window.location.href = `https://wa.me/919050050120?text=${encodeURIComponent(text)}`;
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="relative flex min-h-[50dvh] items-center justify-center overflow-hidden bg-black pb-16 pt-24 sm:pt-32">
        <div className="relative z-10 w-full px-6 sm:px-16 pt-[clamp(3rem,10vh,6rem)] flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-full text-[clamp(3.5rem,10vw,6rem)] font-display font-black uppercase leading-[0.9] tracking-[-0.05em] text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.3)] flex flex-col items-center"
          >
            Contact US
            <span className="text-zinc-400 font-light italic text-[0.95em] [text-shadow:0_2px_32px_rgba(0,0,0,0.4)]">VK DOOR</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 text-xs sm:text-sm md:text-base font-light text-white/95 tracking-widest uppercase flex items-center justify-center gap-4 sm:gap-6 flex-wrap"
          >
            <span>Reach Out</span> 
            <span className="opacity-50">•</span> 
            <span>Connect</span> 
            <span className="opacity-50">•</span> 
            <span>Discuss</span>
          </motion.p>
        </div>
      </section>

      <div>
        {/* Red Contact Details without card */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black px-4 sm:px-16 py-16 sm:py-24 border-t border-white/10"
        >
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <div className="flex items-center gap-4 border-b border-white/20 pb-6 mb-4">
              <Phone className="w-8 h-8 text-white" />
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">CONTACT DETAILS</h2>
            </div>

            <div className="flex flex-col gap-8 sm:gap-12">
              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold tracking-widest text-white/60 uppercase mb-1">Founder</span>
                  <span className="text-lg sm:text-xl font-bold text-white mb-1">Vinod Kumar Jangra</span>
                  <a href="tel:+919416193735" className="text-white/90 font-bold text-lg hover:text-white transition-colors">+91 9416193735</a>
                  
                  <span className="text-xs font-bold tracking-widest text-white/60 uppercase mb-1 mt-6">Company CEO</span>
                  <span className="text-lg sm:text-xl font-bold text-white mb-1">Rajkumar Jangra</span>
                  <a href="tel:+919050120110" className="text-white/90 font-bold text-lg hover:text-white transition-colors">+91 9050120110</a>
                  <a href="tel:+918221800345" className="text-white/90 font-bold text-lg hover:text-white transition-colors mt-1">+91 8221800345</a>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold tracking-widest text-white/60 uppercase mb-1">Chat on WhatsApp</span>
                  <span className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    Rajkumar Jangra <span className="bg-white/20 text-white border border-white/20 text-xs px-2 py-0.5 rounded font-normal shrink-0">CEO</span>
                  </span>
                  <a href="https://wa.me/919050120110?text=Hello%20Mr.%20Rajkumar%20Jangra" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BE5C] text-white text-sm font-bold py-2.5 px-5 rounded-full w-fit transition-colors shadow-lg">
                    <MessageCircle className="w-4 h-4 fill-current" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
              
              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold tracking-widest text-white/60 uppercase mb-1">Email Address</span>
                  <span className="text-lg sm:text-xl font-bold text-white mb-1">Send us an Email</span>
                  <a href="mailto:info@vkdoor.in" className="text-white/90 font-bold text-lg hover:text-white transition-colors">info@vkdoor.in</a>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold tracking-widest text-white/60 uppercase mb-1">Shipping</span>
                  <span className="text-lg sm:text-xl font-bold text-white mb-1">All Over India</span>
                  <span className="text-sm font-medium text-white/80 mt-1">Coming Soon Global Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Main Container for rest parts */}
        <section className="px-4 sm:px-16 py-16 sm:py-24 flex flex-col gap-12 sm:gap-16">
          
          {/* Find Us Map Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto w-full"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-center mt-4 mb-8">
              Find Us On Google - <span className="text-zinc-500">VK DOOR</span>
            </h2>
            
            <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5">
            <div className="flex items-center gap-4 border-b border-black/10 pb-6 mb-8">
              <Navigation className="w-8 h-8 text-black" />
              <h2 className="text-2xl sm:text-3xl font-black text-black">Find Us Map</h2>
            </div>

            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 sm:gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#f5f5f5] flex items-center justify-center shrink-0">
                    <Factory className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold tracking-widest text-[#888] uppercase mb-1">Factory Location</span>
                    <p className="text-base text-ink-muted leading-relaxed">Sarsana - Basra Road, Near Balsamand, Dist. Hisar 125001, Haryana, India</p>
                  </div>
                </div>
                <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-black/10 bg-gray-100">
                  <iframe src="https://maps.google.com/maps?q=Sarsana+Basra+Road,+Hisar&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameBorder="0" scrolling="no" className="w-full h-full border-0" />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex gap-4 sm:gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#f5f5f5] flex items-center justify-center shrink-0">
                    <Store className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold tracking-widest text-[#888] uppercase mb-1">Showroom Location</span>
                    <p className="text-base text-ink-muted leading-relaxed mb-2">Vishwakarma Chowk, Bhadra 335501, Rajasthan, India</p>
                    <p className="text-sm text-ink-muted font-medium bg-[#f5f5f5] px-3 py-1.5 rounded-lg inline-block w-fit">Landmark: Mahindra Tractor Agency (Tirupati Automobile)</p>
                  </div>
                </div>
                <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-black/10 bg-gray-100">
                  <iframe src="https://maps.google.com/maps?q=Vishwakarma+Chowk,+Bhadra&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameBorder="0" scrolling="no" className="w-full h-full border-0" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Let's Get In Touch Form Card IN RED SECTION (Matches Home page exactly) */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white px-4 sm:px-16 py-24 sm:py-32 overflow-hidden flex justify-center border-t border-black/10"
      >
        <div className="max-w-xl w-full flex flex-col items-center mx-auto">
          <h2 className="text-5xl sm:text-7xl font-black text-black mb-4 text-center tracking-tighter">
            Get In Touch
          </h2>
          <p className="text-center text-black/70 font-light leading-relaxed mb-10 max-w-sm">
            Enter your requirement details below to dynamically generate and submit your enquiry to our official WhatsApp sales line.
          </p>

          <form onSubmit={handleWhatsApp} className="w-full flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase text-black/70">NAME</label>
              <input 
                required
                className="bg-black/5 border border-black/10 rounded-xl px-4 py-3 sm:py-4 text-black focus:outline-none focus:border-black/30 transition-colors placeholder:text-black/30 text-sm font-light"
               
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase text-black/70">MOBILE NUMBER</label>
              <input 
                type="tel"
                required
                className="bg-black/5 border border-black/10 rounded-xl px-4 py-3 sm:py-4 text-black focus:outline-none focus:border-black/30 transition-colors placeholder:text-black/30 text-sm font-light"
               
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase text-black/70">REQUIREMENT</label>
              <textarea 
                required
                className="bg-black/5 border border-black/10 rounded-xl px-4 py-3 sm:py-4 text-black focus:outline-none focus:border-black/30 transition-colors min-h-[120px] resize-none placeholder:text-black/30 text-sm font-light"
               
                placeholder="Describe the doors, windows, wood types or custom sizes required..."
                value={formData.req}
                onChange={(e) => setFormData({...formData, req: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-2">
              <label className="text-xs font-bold tracking-widest uppercase text-black/70">LOCATION</label>
              <input 
                required
                className="bg-black/5 border border-black/10 rounded-xl px-4 py-3 sm:py-4 text-black focus:outline-none focus:border-black/30 transition-colors placeholder:text-black/30 text-sm font-light"
               
                placeholder="City, State"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="group w-full bg-black hover:bg-zinc-800 text-white rounded-xl py-4 sm:py-5 font-bold tracking-wide shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] text-sm cursor-pointer"
             
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              SEND ON WHATSAPP
            </button>
          </form>
        </div>
      </motion.section>

      <section className="px-4 sm:px-16 py-16 sm:py-24 max-w-4xl mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Social Media Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5"
        >
          <div className="flex items-center gap-4 border-b border-black/10 pb-6 mb-8">
            <Share2 className="w-8 h-8 text-black" />
            <h2 className="text-2xl sm:text-3xl font-black text-black">Social Media</h2>
          </div>

          <div className="flex flex-col gap-4">
            <a href="https://www.instagram.com/vkdoor.in?igsh=eHEzMmZrbnkwa3U4" target="_blank" rel="noopener noreferrer" className="flex items-center bg-[#f9f9f9] p-4 rounded-xl hover:bg-[#f0f0f0] transition-colors gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <span className="text-black font-semibold text-lg">Vkdoor.in</span>
            </a>

            <a href="#" className="flex items-center bg-[#f9f9f9] p-4 rounded-xl hover:bg-[#f0f0f0] transition-colors gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#1877f2]">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </div>
              <span className="text-black font-semibold text-lg">Facebook</span>
            </a>
          </div>
        </motion.div>

      </section>
      </div>
    </div>
  );
}
