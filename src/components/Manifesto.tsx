import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { useRef } from 'react';

const words = [
  { text: "BUILD", align: "self-start" },
  { text: "PREMIUM", align: "self-center" },
  { text: "WOODEN", align: "self-end" },
  { text: "DOORS &", align: "self-start ml-[10%] sm:ml-[20%]" },
  { text: "BRAND", align: "self-center mr-[5%] sm:mr-[10%]" },
  { text: "EXPERIENCE", align: "self-end" },
];

const Word = ({ children, progress, range, align }: { children: string, progress: MotionValue<number>, range: [number, number, number, number], align: string, key?: any }) => {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [50, 0, 0, -50]);
  
  return (
    <motion.span style={{ opacity, y }} className={`relative inline-block text-black ${align}`}>
      {children}
    </motion.span>
  );
};

export default function Manifesto() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={container} className="bg-white px-6 sm:px-16 pt-[18px] pb-[8px] relative">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[7rem] font-black leading-[0.95] tracking-tighter uppercase flex flex-col w-full gap-4 sm:gap-8">
          {words.map((word, i) => {
            const startIn = 0.1 + (i * 0.05);
            const endIn = startIn + 0.15;
            const startOut = 0.6 + (i * 0.05);
            const endOut = startOut + 0.15;
            return <Word key={i} progress={scrollYProgress} range={[startIn, endIn, startOut, endOut]} align={word.align}>{word.text}</Word>;
          })}
        </h2>
      </div>
    </section>
  );
}


