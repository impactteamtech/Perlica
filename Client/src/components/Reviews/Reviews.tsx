import type { JSX } from "react";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, type Variants, AnimatePresence } from "framer-motion";
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
  // base: 1, md+: 2, lg+: 3
  const [numberViews, setNumberViews] = useState<number>(1);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqMd = window.matchMedia("(min-width: 768px)");

    const update = () => {
      if (mqLg.matches) return setNumberViews(3);
      if (mqMd.matches) return setNumberViews(2);
      return setNumberViews(1);
    };

    update();
    mqLg.addEventListener("change", update);
    mqMd.addEventListener("change", update);
    return () => {
      mqLg.removeEventListener("change", update);
      mqMd.removeEventListener("change", update);
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
    exit: { opacity: 0, y: -16, scale: 0.995, transition: { duration: 0.25 } },
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
      className="flex flex-col gap-6 sm:gap-8 px-4 sm:px-6 lg:px-15 py-10"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
        <div className="w-full flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
           <h1 className="text-4xl lg:text-5xl 2xl:text-6xl color-primary font-mono title-font leading-tight text-center sm:text-left">
            WHAT PEOPLE SAY
           </h1>
          <div className="flex gap-3 sm:gap-4 justify-center sm:justify-end">
            <button title="Previous Review" type="button" onClick={handlePrev}
            className="text-white bg-black cursor-pointer hover:scale-105 rounded-full duration-150 transition-transform p-3 sm:p-4">
                <IoMdArrowBack size={20}/>
               
            </button>
            <button title="Next Review" type="button" onClick={handleNext} className="text-white bg-secondary cursor-pointer hover:scale-105 rounded-full duration-150 transition-transform p-3 sm:p-4">
                <IoMdArrowForward size={20}/>
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleReviews.map((r) => (
              <motion.div
                key={r.email}
                variants={itemVariants}
                className="w-full md:flex-1 min-w-0"
                layout
                exit="exit"
              >
                <ReviewCard review={r} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
    </motion.section>
  )
}

export default Reviews