import type { JSX } from "react";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, type Variants } from "framer-motion";
import ReviewCard from "./ReviewCard";
import type { Review } from "../../lib/types";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";

const Reviews = (): JSX.Element => {
    const reviews: Review[] = [
        {
            name:"Yassine Ben Kacem",
            email:"yassine@gmail.com",
            text:"Amazing experience! The safari was well-organized.",
            rate:4
        },
        {
            name:"Rae Mungai",
            email:"rae@gmail.com",
            text:"The safari was a once-in-a-lifetime experience! Highly recommend.",
            rate:5
        },
        {
            name:"Yuri Munyua",
            email:"yuri@gmail.com",
            text:"Great value for the price. The accommodations were comfortable and the food was delicious.",
            rate:4
        },
        {
            name:"Reda",
            email:"reda@gmail.com",
            text:"The safari exceeded my expectations. The wildlife sightings were incredible and the guides were fantastic.",
            rate:3
        },
        {
            name:"Mohamed",
            email:"mohamed@gmail.com",
            text:"thank you for your services, i will be glade to visit kneya again",
            rate:4
        }
    ];
  const [current, setCurrent] = useState(0);

  const handlePrev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  const handleNext = () => setCurrent((prev) => (prev + 1) % reviews.length);

  // Show up to N reviews at a time, responsive to viewport width.
  // Don't read `window` during module init — derive from state and update on resize.
  const [numberViews, setNumberViews] = useState<number>(() =>
    typeof window !== 'undefined' ? (window.innerWidth > 780 ? 3 : 2) : 2
  );

  // Update numberViews on resize (keeps behavior responsive). Use rAF to avoid flood.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let raf: number | null = null;
    const onResize = () => {
      const val = window.innerWidth > 780 ? 3 : 2;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setNumberViews(val));
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const visibleCount = Math.min(numberViews, reviews.length);
  const visibleReviews = Array.from({ length: visibleCount }, (_, i) => reviews[(current + i) % reviews.length]);

  const controls = useAnimation();
  const ref = useRef<HTMLElement | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.995 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
  };

  // start animation when section enters the viewport
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      controls.start("visible");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible");
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [controls]);

  return (
    <motion.section
      ref={ref}
      className="flex flex-col gap-8 px-15 py-10 "
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
        <div className="w-full flex items-center justify-between">
           <h1 className="text-6xl font-mono title-font color-primary">WHAT PEOPLE SAY</h1>
          <div className="flex gap-4">
            <button title="Previous Review" onClick={handlePrev}
            className="border-black/70 border-1 cursor-pointer hover:scale-105 rounded-full duration-150 transition-transform p-4">
                <IoMdArrowBack size={20}/>
               
            </button>
            <button title="Next Review" onClick={handleNext} className="border-black/70 border-1 cursor-pointer hover:scale-105 rounded-full duration-150 transition-transform p-4">
                <IoMdArrowForward size={20}/>
            </button>
          </div>
        </div>
        <div className="flex  gap-6 md:gap-8">
          {visibleReviews.map((r, i) => (
            <motion.div key={`${r.email}-${i}`} variants={itemVariants} className="flex-1">
              <ReviewCard review={r} />
            </motion.div>
          ))}
        </div>
    </motion.section>
  )
}

export default Reviews