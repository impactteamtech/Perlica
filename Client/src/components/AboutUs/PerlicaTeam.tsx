import type {JSX} from 'react'
import { useMemo, useState } from 'react'
import { tourGuides } from '../../lib/staticData';
import GuideCard from './GuideCard';
import { AnimatePresence, motion } from 'framer-motion';

const ITEMS_PER_VIEW = 3;
const Carousel = (): JSX.Element | null => {
  const len = tourGuides.length;
  const [index, setIndex] = useState(0); // start index of the window
  const [direction, setDirection] = useState<1 | -1>(1);

  const visible = useMemo(() => {
    const count = Math.min(ITEMS_PER_VIEW, len);
    return Array.from({ length: count }, (_, i) => tourGuides[(index + i) % len]);
  }, [index, len]);

  if (len === 0) return null;

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % len);
  };
  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + len) % len);
  };

  return (
    <div className='w-full flex flex-col gap-6'>
      {/* Viewport */}
      <div className='w-full '>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -40 : 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className='w-full flex justify-center gap-6 md:gap-10'
          >
            {visible.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className='flex w-full justify-center items-center mt-15 gap-10'>
        <button className='flex relative items-center' onClick={prev} aria-label='Previous guides'>
          <img src="/arrow.png" alt="previous" className='w-25 cursor-pointer hover:scale-105 duration-200 transition-all rotate-180' />
        </button>
        <button onClick={next} aria-label='Next guides'>
          <img src="/arrow.png" alt="next" className='w-25 cursor-pointer hover:scale-105 duration-200 transition-all' />
        </button>
      </div>
    </div>
  );
};
const PerlicaTeam = (): JSX.Element => {
  return (
    <div className='w-full mt-20 flex min-h-screen flex-col gap-8'>
      <h2 className='text-5xl text-primary font-baskerville font-bold'>
        Meet Our Expert Team
      </h2>
      <div className='w-full flex  flex-col gap-10'>
        <div className='w-full flex  flex-col gap-10'>
          <Carousel />
        </div>
        <div className='w-full flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-10 p-4 md:p-6 rounded-2xl bg-secondary/10 border border-secondary/20 ring-1 ring-secondary/10 shadow-sm'>
          <div className='w-full md:w-1/2'>
            <div className='relative pl-5'>
              <span aria-hidden className='absolute left-0 top-0 h-full w-1.5 rounded-full bg-primary/80' />
              <p className='font-baskerville text-base md:text-lg text-black/80 leading-relaxed'>
                Our expert team has combined deep local knowledge with global travel insight to
                create safaris and tours you'll never forget.
                All you have to do is explore, whether it's your first safari or your fiftieth,
                we'll show you the hidden gems others miss, all at the best value possible.
                <br />
                <span className='block mt-2 text-primary font-semibold'>Let's make your next journey extraordinary.</span>
              </p>
            </div>
          </div>
          <div className='w-full md:w-[45%]'>
            <img
              className='w-full h-[260px] md:h-[320px] object-cover rounded-xl shadow-md ring-1 ring-white/70'
              src="/perlica_team.jpg"
              alt="tour-guides"
            />
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default PerlicaTeam