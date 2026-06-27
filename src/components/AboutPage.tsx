import { motion } from 'motion/react';
import { Trophy, Target, Award, Hammer, Info, Phone, MapPin, Briefcase, Hash, LineChart, Users } from 'lucide-react';
import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="relative flex min-h-[35dvh] items-center justify-center overflow-hidden bg-black pb-12 pt-24 sm:pt-32">
        <div className="relative z-10 w-full px-4 sm:px-16 pt-8 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full text-[7.5vw] sm:text-[5vw] md:text-5xl lg:text-6xl xl:text-7xl font-display font-black uppercase tracking-[-0.04em] text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.3)] whitespace-nowrap overflow-hidden text-ellipsis text-center"
          >
            About Us <span className="text-zinc-500 font-black italic">Company</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-4 text-[2.8vw] sm:text-xs md:text-sm font-light text-white/80 tracking-[0.2em] uppercase flex items-center justify-center gap-2 sm:gap-6 flex-wrap font-sans"
          >
            <span>Legacy</span> 
            <span className="opacity-45">•</span> 
            <span>Craftsmanship</span> 
            <span className="opacity-45">•</span> 
            <span>Trust</span>
          </motion.p>
        </div>
      </section>

      {/* Alternating Full-Width Sections without cards */}
      <div className="flex flex-col w-full font-sans overflow-hidden">
        
        {/* SECTION 1: OUR JOURNEY (Black Background) */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-zinc-950 text-zinc-100 border-b border-zinc-900"
        >
          <div className="px-6 sm:px-16 py-16 sm:py-24 max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-left">
              <span className="text-white">Our</span> <span className="text-zinc-500 italic">Journey</span>
            </h2>
            
            <div className="flex flex-col gap-6 mt-4">
              <p className="text-base sm:text-lg leading-relaxed font-medium text-zinc-200">
                <span className="font-extrabold text-white inline-block whitespace-nowrap">VK DOOR</span> is not just a wooden door manufacturing company; it is a legacy built on hard work, trust, and generations of craftsmanship.
              </p>
              
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                Our journey began in <span className="font-bold text-zinc-100">1992</span> under the guidance of <span className="font-bold text-white inline-block whitespace-nowrap">Late Sh. Dharmpal Jangra</span>, who started wooden door work at a local level. With limited resources but unlimited dedication, he focused on quality workmanship, honesty, and customer trust. His skills and values laid the foundation of what would later become <span className="font-extrabold text-white inline-block whitespace-nowrap">VK DOOR</span>.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                After the unfortunate passing of <span className="font-bold text-white inline-block whitespace-nowrap">Late Sh. Dharmpal Jangra</span>, the responsibility of the business fell on his son, <span className="font-bold text-white inline-block whitespace-nowrap">Mr. Vinod Kumar Jangra</span>. At a time filled with challenges and responsibilities, he showed strength, determination, and vision. Instead of giving up, he decided to move forward and take his father’s work to a new level.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                Through years of tireless effort, learning, and innovation, <span className="font-bold text-white inline-block whitespace-nowrap">Mr. Vinod Kumar Jangra</span> expanded the business, improved manufacturing processes, and formally established the company under the name <span className="font-extrabold text-white inline-block whitespace-nowrap">VK DOOR</span>. What once started as local work gradually grew into a recognized wooden door manufacturing brand known for reliability and superior quality.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                Today, <span className="font-extrabold text-white inline-block whitespace-nowrap">VK DOOR</span> continues to grow with the involvement of the next generation. <span className="font-bold text-white inline-block whitespace-nowrap">Mr. Rajkumar Jangra</span>, son of <span className="font-bold text-white inline-block whitespace-nowrap">Mr. Vinod Kumar Jangra</span>, has joined the business, bringing modern ideas, fresh energy, and updated techniques while respecting and preserving traditional craftsmanship. His involvement has strengthened operations and helped <span className="font-extrabold text-white inline-block whitespace-nowrap">VK DOOR</span> adapt to changing market demands.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                In addition, from the year <span className="font-bold text-zinc-100">2026</span>, <span className="font-bold text-white inline-block whitespace-nowrap">Mr. Kunal Jangra</span>, brother of <span className="font-bold text-white inline-block whitespace-nowrap">Mr. Rajkumar Jangra</span>, has also become a part of <span className="font-extrabold text-white inline-block whitespace-nowrap">VK DOOR</span>. He actively supports and helps manage the business, contributing to daily operations, growth, and future expansion. His involvement further strengthens the family-driven foundation of <span className="font-extrabold text-white inline-block whitespace-nowrap">VK DOOR</span>.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                With more than <span className="font-bold text-white inline-block whitespace-nowrap">34 years</span> of industry experience, <span className="font-extrabold text-white inline-block whitespace-nowrap">VK DOOR</span> specializes in manufacturing a wide range of wooden doors that are strong, durable, aesthetically appealing, and crafted to meet customer-specific requirements.
              </p>

              {/* Since 1992 Decorative */}
              <div className="font-great-vibes text-6xl sm:text-7xl text-zinc-800 text-center mt-6 select-none bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 bg-clip-text text-transparent filter drop-shadow-sm">
                Since 1992
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 2: COMPANY INTRO (White Background) */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white text-zinc-900 border-b border-zinc-100"
        >
          <div className="px-6 sm:px-16 py-16 sm:py-24 max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-left">
              <span className="text-zinc-950">Company</span> <span className="text-zinc-500 italic">Intro</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 mt-2">
              VK DOOR is a trusted wooden door manufacturing brand known for quality, craftsmanship, and long-lasting durability. Established in 1992, the company has grown from a small workshop into a professional manufacturing unit led by multiple generations of the Jangra family. With over 34 years of experience, VK DOOR blends traditional woodworking skills with modern techniques to create premium wooden doors that enhance any space. Our commitment to honesty, precision, and customer satisfaction makes us a reliable choice for homes, offices, and commercial projects.
            </p>
          </div>
        </motion.section>

        {/* SECTION 3: COMPANY OVERVIEW (Black Background) */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-zinc-950 text-zinc-100 border-b border-zinc-900"
        >
          <div className="px-6 sm:px-16 py-16 sm:py-24 max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-left">
              <span className="text-white">Company</span> <span className="text-zinc-500 italic">Overview</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-400 mt-2">
              VK DOOR is a family-led wooden door manufacturing company established in 1992. Built on a foundation of trust, craftsmanship, and quality, the company has grown from a small workshop into a respected brand. Under the leadership of multiple generations, VK DOOR combines traditional skills with modern techniques to create durable, stylish, and high-quality wooden doors. With over 34 years of experience, we remain committed to excellence, innovation, and customer satisfaction in every product we deliver.
            </p>
          </div>
        </motion.section>

        {/* SECTION 4: OUR VISION (White Background) */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white text-zinc-900 border-b border-zinc-100"
        >
          <div className="px-6 sm:px-16 py-16 sm:py-24 max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-left">
              <span className="text-zinc-950">Our</span> <span className="text-zinc-500 italic">Vision</span>
            </h2>
            <div className="flex gap-4 items-start mt-2">
              <div className="p-3 bg-zinc-100 rounded-full shrink-0">
                <Trophy className="w-6 h-6 text-zinc-900" />
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-600">
                VK DOOR envisions becoming a benchmark in the wooden door industry by shaping a future where craftsmanship and innovation work hand in hand. Our vision is to build a brand that represents trust, refined quality, and timeless design. We strive to expand our presence, elevate our technology, and create products that redefine standards of durability and elegance. As we grow, we aim to inspire confidence in every customer by delivering wooden doors that reflect our legacy and guide our path toward a stronger, more innovative future.
              </p>
            </div>
          </div>
        </motion.section>

        {/* SECTION 5: OUR MISSION (Black Background) */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-zinc-950 text-zinc-100 border-b border-zinc-900"
        >
          <div className="px-6 sm:px-16 py-16 sm:py-24 max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-left">
              <span className="text-white">Our</span> <span className="text-zinc-500 italic">Mission</span>
            </h2>
            <div className="flex gap-4 items-start mt-2">
              <div className="p-3 bg-white/10 rounded-full shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                Our mission is to manufacture wooden doors with unmatched precision, reliability, and craftsmanship while maintaining complete dedication to customer satisfaction. We are committed to operate with discipline, advanced manufacturing practices, and a continuous improvement mindset. By focusing on quality control, efficient production, and transparent communication, we ensure every door meets the highest standards. Our mission drives us to deliver products that add real value to customers’ spaces and strengthen the trust that defines VK DOOR.
              </p>
            </div>
          </div>
        </motion.section>

        {/* SECTION 6: OUR WORKSHOP (White Background) */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white text-zinc-900 border-b border-zinc-100"
        >
          <div className="px-6 sm:px-16 py-16 sm:py-24 max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-left">
              <span className="text-zinc-950">Our</span> <span className="text-zinc-500 italic">Workshop</span>
            </h2>
            <div className="flex gap-4 items-start mt-2">
              <div className="p-3 bg-zinc-100 rounded-full shrink-0">
                <Hammer className="w-6 h-6 text-zinc-900" />
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-600">
                Our workshop combines skilled craftsmanship with modern machinery to create high-quality wooden doors. Every step, from material selection to finishing, is handled with precision and strict quality control to ensure durability and flawless results.
              </p>
            </div>
          </div>
        </motion.section>

        {/* SECTION 7: BRAND PROMISE (Black Background) */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-zinc-950 text-zinc-100 border-b border-zinc-900"
        >
          <div className="px-6 sm:px-16 py-16 sm:py-24 max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-left">
              <span className="text-white">Brand</span> <span className="text-zinc-500 italic">Promise</span>
            </h2>
            <div className="flex gap-4 items-start mt-2">
              <div className="p-3 bg-white/10 rounded-full shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                VK DOOR promises to deliver wooden doors that embody strength, beauty, and long-lasting quality. Every product we craft reflects our commitment to precision, honesty, and customer satisfaction. With a blend of traditional craftsmanship and modern innovation, we ensure doors that enhance spaces and stand the test of time. Our promise is simple to provide trusted quality you can feel, durability you can rely on, and craftsmanship you can proudly choose.
              </p>
            </div>
          </div>
        </motion.section>

        {/* SECTION 8: CORE VALUES (White Background) */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white text-zinc-900 border-b border-zinc-100"
        >
          <div className="px-6 sm:px-16 py-16 sm:py-24 max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-left">
              <span className="text-zinc-950">Core</span> <span className="text-zinc-500 italic">Values</span>
            </h2>
            <div className="grid gap-6 mt-4">
              {[
                { title: "1. Quality Craftsmanship", desc: "We take pride in delivering doors made with precision, strength, and attention to every detail." },
                { title: "2. Trust & Transparency", desc: "Honesty is at the heart of our business, ensuring clear communication and reliable service." },
                { title: "3. Customer Commitment", desc: "We focus on understanding customer needs and providing products that offer long-lasting value." },
                { title: "4. Innovation & Improvement", desc: "We continuously upgrade our processes, techniques, and designs to stay ahead of industry standards." },
                { title: "5. Family Legacy", desc: "Our work reflects generations of dedication, values, and craftsmanship carried forward with pride." },
                { title: "6. Durability & Reliability", desc: "Every door we produce is built to last, offering dependable performance for years." },
                { title: "7. Integrity in Work", desc: "We deliver what we promise without compromise in quality or ethics." }
              ].map((val, idx) => (
                <div key={idx} className="flex flex-col border-b border-zinc-100 pb-4 last:border-none last:pb-0">
                  <span className="font-extrabold text-sm sm:text-base text-zinc-950 tracking-tight mb-1">{val.title}</span>
                  <span className="text-xs sm:text-sm text-zinc-500 leading-relaxed">{val.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION 9: UNIQUE SELLING POINTS (Black Background) */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-zinc-950 text-zinc-100 border-b border-zinc-900"
        >
          <div className="px-6 sm:px-16 py-16 sm:py-24 max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3.5xl font-black uppercase tracking-tight text-left">
              <span className="text-white">Unique</span> <span className="text-zinc-500 italic">Selling Points</span>
            </h2>
            <div className="grid gap-6 mt-4">
              {[
                { title: "1. Superior Craftsmanship", desc: "Every door is crafted with precision and care, combining traditional skills with modern finishing standards." },
                { title: "2. Premium Quality Wood", desc: "We use high-grade, durable wood that ensures long life, strength, and excellent performance." },
                { title: "3. 34+ Years of Expertise", desc: "Decades of hands-on experience allow us to deliver products that truly stand out in quality and reliability." },
                { title: "4. Custom-Made Designs", desc: "From size to style, we offer fully customizable wooden doors tailored to your specific needs." },
                { title: "5. Family-Led Legacy", desc: "A trusted brand built on generations of dedication, honesty, and consistent workmanship." },
                { title: "6. Advanced Manufacturing Process", desc: "Modern techniques and updated machinery ensure flawless finishing and consistent quality." },
                { title: "7. Strong & Durable Construction", desc: "Our doors are built to withstand daily use, climate variations, and long-term wear." },
                { title: "8. Trustworthy Service", desc: "From consultation to delivery, we maintain transparency, timely communication, and customer-focused support." },
                { title: "9. Aesthetic Appeal", desc: "We create doors that are not only strong but also stylish, adding elegance to any space." },
                { title: "10. Reliability You Can Count On", desc: "Every VK DOOR product is tested for performance, durability, and finishing before delivery." }
              ].map((val, idx) => (
                <div key={idx} className="flex flex-col border-b border-white/10 pb-4 last:border-none last:pb-0">
                  <span className="font-extrabold text-sm sm:text-base text-white tracking-tight mb-1">{val.title}</span>
                  <span className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{val.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION 10: BUSINESS INFORMATION (White Background) */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white text-zinc-900 border-b border-zinc-100"
        >
          <div className="px-6 sm:px-16 py-16 sm:py-24 max-w-4xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3.5xl font-black uppercase tracking-tight text-left text-zinc-950">
              Business <span className="text-zinc-500 italic">Information</span>
            </h2>
            <div className="flex flex-col gap-5 mt-4">
              
              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-zinc-200 pb-3 gap-1">
                <span className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <Briefcase className="w-4 h-4 shrink-0 text-zinc-600" /> Business Name
                </span>
                <span className="text-sm sm:text-base font-bold text-zinc-950 text-left sm:text-right">VK DOOR</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-zinc-200 pb-3 gap-1">
                <span className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <Info className="w-4 h-4 shrink-0 text-zinc-600" /> Since
                </span>
                <span className="text-sm sm:text-base font-bold text-zinc-950 text-left sm:text-right">Year 1992</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-zinc-200 pb-3 gap-1">
                <span className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <Briefcase className="w-4 h-4 shrink-0 text-zinc-600" /> Business Type
                </span>
                <span className="text-sm sm:text-base font-bold text-zinc-950 text-left sm:text-right">Wooden Door Manufacturer/Supplier</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-zinc-200 pb-3 gap-1">
                <span className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <Users className="w-4 h-4 shrink-0 text-zinc-600" /> Founder
                </span>
                <span className="text-sm sm:text-base text-zinc-800 text-left sm:text-right font-medium flex flex-wrap gap-x-1.5 gap-y-0.5 sm:justify-end">
                  <span className="font-extrabold text-zinc-950 inline-block whitespace-nowrap">Mr. Vinod Kumar</span> <span className="text-zinc-400">S/o</span> <span className="font-extrabold text-zinc-950 inline-block whitespace-nowrap">Sh. Dharampal Jangra</span>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-zinc-200 pb-3 gap-1">
                <span className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <Users className="w-4 h-4 shrink-0 text-zinc-600" /> Company CEO
                </span>
                <span className="text-sm sm:text-base text-zinc-800 text-left sm:text-right font-medium flex flex-wrap gap-x-1.5 gap-y-0.5 sm:justify-end">
                  <span className="font-extrabold text-zinc-950 inline-block whitespace-nowrap">Mr. Rajkumar</span> <span className="text-zinc-400">S/o</span> <span className="font-extrabold text-zinc-950 inline-block whitespace-nowrap">Mr. Vinod Kumar Jangra</span>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-zinc-200 pb-3 gap-1">
                <span className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <Hash className="w-4 h-4 shrink-0 text-zinc-600" /> GSTIN
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-zinc-800 text-left sm:text-right">06AXYPK8354Q1Z8</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-zinc-200 pb-3 gap-1">
                <span className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <LineChart className="w-4 h-4 shrink-0 text-zinc-600" /> Turnover
                </span>
                <span className="text-sm sm:text-base font-bold text-zinc-950 text-left sm:text-right">2 - 4 Cr</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-zinc-200 pb-3 gap-1">
                <span className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <Users className="w-4 h-4 shrink-0 text-zinc-600" /> Employees
                </span>
                <span className="text-sm sm:text-base font-bold text-zinc-950 text-left sm:text-right">5 - 10 People</span>
              </div>

              <div className="flex flex-col border-b border-zinc-200 pb-3 gap-1.5 text-left">
                <span className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0 text-zinc-600" /> Factory Location
                </span>
                <span className="text-sm sm:text-base font-medium text-zinc-600 leading-relaxed">
                  Sarsana - Basra Road, Near Balsamand, Dist. Hisar, 125001 (Haryana) India
                </span>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <span className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0 text-zinc-600" /> Contact Details
                </span>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-50 rounded-xl flex flex-col gap-1 border border-zinc-100">
                    <span className="text-xs font-bold text-zinc-500 inline-block whitespace-nowrap">Mr. Vinod Kumar Jangra</span>
                    <a href="tel:+919416193735" className="text-sm sm:text-base font-extrabold text-[#27ae60] hover:underline hover:underline-offset-4 w-fit">
                      +91 94161 93735
                    </a>
                  </div>

                  <div className="p-4 bg-zinc-50 rounded-xl flex flex-col gap-1 border border-zinc-100">
                    <span className="text-xs font-bold text-zinc-500 inline-block whitespace-nowrap">Mr. Rajkumar Jangra</span>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+919050120110" className="text-sm sm:text-base font-extrabold text-[#27ae60] hover:underline hover:underline-offset-4 w-fit">
                        +91 90501 20110
                      </a>
                      <a href="tel:+918221800345" className="text-sm sm:text-base font-extrabold text-[#27ae60] hover:underline hover:underline-offset-4 w-fit">
                        +91 82218 00345
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.section>

        {/* SECTION 11: MAKE IN INDIA & FOOTER (White Background) */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white text-zinc-900 border-t border-zinc-100"
        >
          <div className="px-6 sm:px-16 py-12 max-w-4xl mx-auto flex flex-col items-center">
            <div className="flex justify-center items-center w-full">
              <img 
                src="https://i.postimg.cc/G28587FX/Make-in-India-Logo-Vector.png" 
                alt="Make in India" 
                className="max-w-[200px] w-full h-auto opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-none select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
