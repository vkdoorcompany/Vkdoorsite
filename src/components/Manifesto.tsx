import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { useRef } from 'react';

const words = [
  { text: "BUILD", align: "self-start" },
  { text: "PREMIUM", align: "self-center" },
  { text: "WOODEN", align: "self-end" },
  { text: "DOORS &", align: "self-start ml-[5%] sm:ml-[20%]" },
  { text: "BRAND", align: "self-center mr-[2%] sm:mr-[10%]" },
  { text: "EXPERIENCE", align: "self-end" },
];

const Word = ({ children, progress, range, align }: { children: string, progress: MotionValue<number>, range: [number, number, number, number], align: string, key?: any }) => {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [30, 0, 0, -30]);
  
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
    <section ref={container} className="bg-white px-6 sm:px-16 flex items-center h-[80vh] sm:h-[110vh] relative">
      <div className="max-w-6xl mx-auto w-full sticky top-1/2 -translate-y-1/2">
        <h2 className="text-[1.8rem] xs:text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter uppercase flex flex-col w-full gap-2 sm:gap-6">
          {words.map((word, i) => {
            const startIn = 0.1 + (i * 0.05);
            const endIn = startIn + 0.15;
            const startOut = 0.6 + (i * 0.05);
            const endOut = startOut + 0.15;
            return <Word key={i} progress={scrollYProgress} range={[startIn, endIn, startOut, endOut]} align={word.align}>{word.text}</Word>
          })}
        </h2>
      </div>
    </section>
  );
}
