import { motion, useInView } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Workflow() {
  const steps = [
    { 
      num: '01', 
      title: 'Wooden Doors', 
      desc: 'Custom main entrance double doors, modern modular panel models, and high-security solid interior panels.'
    },
    { 
      num: '02', 
      title: 'Wooden Windows', 
      desc: 'French windows, heavy-duty sliding casements, and vintage glass pane framing options.'
    },
    { 
      num: '03', 
      title: 'Frames & Chaukhats', 
      desc: 'High-precision door/window framing chaukhats, modern designer architraves, skirtings, and decorative trim profiles.'
    }
  ];

  return (
    <section id="services" className="bg-bg py-20 sm:py-32 border-b border-divider/60 relative">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        
        {/* Typographical Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid md:grid-cols-12 gap-8 items-start justify-between pb-12 border-b border-divider/60">
          <div className="md:col-span-8">
            <h2 className="text-[2.5rem] sm:text-[5rem] uppercase tracking-tighter font-black text-ink leading-[0.95]">
              Custom Architectural<br/>
              <span className="text-zinc-400 font-light italic text-[0.95em]">Carpentry</span>
            </h2>
          </div>
          <p className="md:col-span-4 text-sm sm:text-base font-medium text-zinc-500 leading-relaxed md:pt-14">
            Our premium solid timber components are hand-finished to precise specifications.
          </p>
        </motion.div>

        {/* 3 Columns Typographical Stage */}
        <div className="mt-12 sm:mt-16 grid gap-6 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-divider/60">
          {steps.map((step, i) => {
            const stepRef = useRef(null);
            const isInView = useInView(stepRef, { once: true, margin: "-10%" });
            return (
              <motion.div 
                key={i} 
                ref={stepRef}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                className={`flex flex-col justify-start pt-6 md:pt-0 ${i !== 0 ? 'md:pl-8' : ''}`}
              >
                <div>
                  {/* Massive Typographical Number */}
                  <div className="text-7xl sm:text-8xl font-light tracking-tighter text-zinc-200 select-none leading-none mb-4">
                    {step.num}
                  </div>
                  
                  {/* Elegant Separator */}
                  <div className="w-8 h-1 bg-black mb-4"></div>

                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-black tracking-tight mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm font-light text-zinc-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

interface PointType {
  title: string;
  badge: string;
  desc: string;
}

export function About() {
  const points: PointType[] = [
    { 
      title: "UNMATCHED PRICE", 
      badge: "FACTORY TO SITE",
      desc: "Unbeatable prices for premium wooden doors! Get top-quality craftsmanship, durability, and style without overspending. Luxury meets affordability like never before."
    },
    { 
      title: "TWIST & BEND RESISTANT", 
      badge: "STABILITY ASSURED",
      desc: "Engineered for strength! Our wooden doors are twist & bend resistant, ensuring long-lasting durability and perfect shape for years."
    },
    { 
      title: "CUSTOM MADE", 
      badge: "BESPOKE SIZE",
      desc: "Tailored to perfection! Our custom-made wooden doors are designed to match your style, size, and finish for a unique touch."
    },
    { 
      title: "TERMITE RESISTANT", 
      badge: "CHEMICALLY SHIELDED",
      desc: "Shielded against termites! Our termite-resistant wooden doors ensure lasting durability, keeping your home protected and stylish for years."
    },
    { 
      title: "100% NATURAL WOOD", 
      badge: "PURE WOOD GRAIN",
      desc: "Crafted from 100% natural wood, our doors bring unmatched strength, elegance, and authenticity, ensuring a timeless and durable addition to your space."
    },
    { 
      title: "34+ YEARS OF EXPERIENCE", 
      badge: "ESTABLISHED 1992",
      desc: "Since 1992, we've built years of expertise in crafting premium wooden doors, delivering unmatched quality, durability, and elegance."
    }
  ];

  return (
    <section id="about-us" className="bg-[#050505] text-white px-6 md:px-16 py-20 sm:py-32 overflow-hidden border-t border-zinc-800 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Typographical Header styled identical to Carpentry with Black background */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid md:grid-cols-12 gap-8 items-start justify-between pb-12 border-b border-zinc-800 w-full mb-8 sm:mb-12 text-left">
          <div className="md:col-span-8">
            <h2 className="text-[2.5rem] sm:text-[5rem] uppercase tracking-tighter font-black text-white leading-[0.95]">
              Why Choose <span className="text-zinc-500 font-light italic text-[0.95em]">Us</span>
            </h2>
          </div>
          <p className="md:col-span-4 text-sm sm:text-base font-medium text-zinc-400 leading-relaxed md:pt-14">
            Built on years of expertise, delivering unmatched quality, durability, and natural elegance.
          </p>
        </motion.div>

        {/* 3 Columns Typographical Stage matched perfectly */}
        <div className="w-full grid gap-8 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800 text-left mt-0">
          {points.map((p, i) => {
            const itemRef = useRef(null);
            const isInView = useInView(itemRef, { once: true, margin: "-10%" });
            return (
              <motion.div
                key={i}
                ref={itemRef}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                className={`flex flex-col justify-start pt-6 md:pt-0 ${i !== 0 ? 'md:pl-8' : ''}`}
              >
                <div>
                  {/* Massive Typographical Number */}
                  <div className="text-7xl sm:text-8xl font-light tracking-tighter text-zinc-800 select-none leading-none mb-4">
                    {`0${i + 1}`}
                  </div>
                  
                  {/* Elegant Separator */}
                  <div className="w-8 h-1 bg-white mb-4"></div>

                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-tight mb-2">
                    {p.title}
                  </h3>
                  
                  <p className="text-sm font-light text-zinc-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', req: '', location: '' });

  const handleWhatsApp = () => {
    const text = `Hello VK DOOR\nName: ${formData.name}\nMobile: ${formData.phone}\nLocation: ${formData.location}\nRequirement: ${formData.req}`;
    try {
      const newWin = window.open(`https://wa.me/919050050120?text=${encodeURIComponent(text)}`, '_blank');
      if (!newWin) {
        window.location.href = `https://wa.me/919050050120?text=${encodeURIComponent(text)}`;
      }
    } catch (e) {
      console.warn("window.open blocked or failed in sandbox iframe. Navigating in-frame instead:", e);
      window.location.href = `https://wa.me/919050050120?text=${encodeURIComponent(text)}`;
    }
  };

  return (
    <section id="contact-us" className="bg-white px-4 sm:px-16 py-24 sm:py-32 overflow-hidden flex justify-center border-t border-divider/50">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-xl w-full flex flex-col items-center">
        <h2 className="text-5xl sm:text-7xl font-black text-black mb-4 text-center tracking-tighter">
          Get In Touch
        </h2>
        <p className="text-center text-black/70 font-light leading-relaxed mb-10 max-w-sm">
          Enter your requirement details below to dynamically generate and submit your enquiry to our official WhatsApp sales line.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); handleWhatsApp(); }} className="w-full flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-widest uppercase text-black/70">NAME</label>
            <input 
              required
              className="bg-black/5 border border-black/10 rounded-xl px-4 py-3 sm:py-4 text-black focus:outline-none focus:border-black/30 transition-colors placeholder:text-black/30 text-sm font-light"
             
              placeholder="Enter full name"
              value={formData.name || ''}
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
              value={formData.phone || ''}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-widest uppercase text-black/70">REQUIREMENT</label>
            <textarea 
              required
              className="bg-black/5 border border-black/10 rounded-xl px-4 py-3 sm:py-4 text-black focus:outline-none focus:border-black/30 transition-colors min-h-[120px] resize-none placeholder:text-black/30 text-sm font-light"
             
              placeholder="Describe the doors, windows, wood types or custom sizes required..."
              value={formData.req || ''}
              onChange={(e) => setFormData({...formData, req: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-2">
            <label className="text-xs font-bold tracking-widest uppercase text-black/70">LOCATION</label>
            <input 
              required
              className="bg-black/5 border border-black/10 rounded-xl px-4 py-3 sm:py-4 text-black focus:outline-none focus:border-black/30 transition-colors placeholder:text-black/30 text-sm font-light"
             
              placeholder="City, State"
              value={formData.location || ''}
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
      </motion.div>
    </section>
  );
}

export function Footer() {
  const { pathname } = useLocation();

  const getIsActive = (href: string, itemName: string) => {
    if (itemName === 'Home') return pathname === '/';
    if (itemName === 'Contact Us') return pathname === '/contact';
    return false;
  };

  return (
    <footer className="bg-bg relative font-light">
      <div className="border-t border-divider/60 px-6 sm:px-16 py-10 flex flex-col md:flex-row gap-8 justify-between items-center z-10 relative">
        <a href="mailto:info@vkdoor.in" className="text-xl font-light text-ink hover:text-brand transition-colors">
          info@vkdoor.in
        </a>
        <nav className="flex flex-wrap justify-center gap-6 sm:gap-8 text-center">
          {[
            { name: 'Home', href: '/' },
            { name: 'About Us', href: '/about' },
            { name: 'Contact Us', href: '/contact' },
            { name: 'Design Lookbook', href: '/lookbook' }
          ].filter(item => {
            if (item.name === 'Home') return pathname !== '/';
            if (item.name === 'About Us') return pathname !== '/about';
            if (item.name === 'Contact Us') return pathname !== '/contact';
            if (item.name === 'Design Lookbook') return pathname !== '/lookbook';
            return true;
          }).map((item) => (
            <Link 
              key={item.name} 
              to={item.href} 
              onClick={() => { if(item.name === 'Home') window.scrollTo(0,0); }}
              className={`text-xs sm:text-sm font-light uppercase tracking-widest transition-colors ${getIsActive(item.href, item.name) ? 'text-black font-medium' : 'text-ink hover:text-black'}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <p className="text-sm font-light text-ink-muted">© 2026 VK DOOR. COPYRIGHT RESERVED</p>
      </div>
      <div className="overflow-hidden w-full flex justify-center pb-8 pt-4">
        <p className="text-[20vw] font-black uppercase leading-none tracking-tighter text-black text-center transform scale-y-[1.1] sm:scale-y-[1.25] -translate-y-4">
          VK DOOR
        </p>
      </div>
    </footer>
  );
}
