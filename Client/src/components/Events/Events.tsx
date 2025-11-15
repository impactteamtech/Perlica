import { useState, type JSX } from 'react';
import { events } from '../../lib/staticData';
import EventCard from './EventCard';
import {IoMdArrowBack, IoMdArrowForward} from 'react-icons/io';

const Events = (): JSX.Element => {
  const [selectedIdx, setSelectedIdx] = useState(events.length > 0 ? 0 : -1);

  const getEventIdx = (offset: number) => {
    if (events.length === 0) return -1;
    return (selectedIdx + offset + events.length) % events.length;
  };
  const formatIdx = (n: number) => (n + 1).toString().padStart(2, '0');
  const tripletIdx = [getEventIdx(-1), selectedIdx, getEventIdx(1)];
  const visibleEvents = tripletIdx.map((idx) => ({ data: events[idx], idx }));

  const handlePrev = () => setSelectedIdx(idx => (idx - 1 + events.length) % events.length);
  const handleNext = () => setSelectedIdx(idx => (idx + 1) % events.length);

  return (
    <section className="min-h-screen flex flex-col gap-8 py-10 mb-3 relative bg-background-color">
      <h1 className="text-5xl md:text-6xl title-font text-center w-full font-mono color-primary mb-6  z-50">ADVENTURE AND NATURE ACTIVITIES</h1>
   
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
        {/* Left: navigation and event info */}
        <div className="flex justify-center flex-col items-center gap-6 mr-20 w-full md:w-[40%]">
          <img 
          className='w-80'
          src="/Perlica_logo.png" 
          alt="Perlica Logo"/>
          <div className="flex items-center  gap-3 mb-2">
            <button 
            title='previous event'
            aria-label='Previous event'
            onClick={handlePrev} className="cursor-pointer bg-black text-white  hover:scale-105 rounded-full duration-150 transition-transform p-4">
              <IoMdArrowBack size={20} />
            </button>
            <span className="text-xl font-medium text-black/60">{formatIdx(selectedIdx)}</span>
            <span className="text-lg text-black/60">/ {formatIdx(events.length - 1)}</span>
            <button 
            title="next event"
            aria-label='Next event'
            onClick={handleNext} className="cursor-pointer bg-secondary text-white hover:scale-105 rounded-full duration-150 transition-transform p-4">
              <IoMdArrowForward size={20} />
            </button>
          </div>
        </div>
        <div className="flex gap-6 w-full md:w-[60%] justify-center items-center">
          {visibleEvents.map((v, i) => (
            <button
              type="button"
              key={v.data?.name || v.idx}
              onClick={() => setSelectedIdx(v.idx)}
              className={`transition-all duration-500 ${i === 1 ? 'scale-105 z-20' : 'scale-95 opacity-80 z-10'} focus:outline-none`}
              title={v.data?.name || 'event'}
              aria-label={`Select ${v.data?.name ?? 'event'}`}
            >
              {v.data && (
                <EventCard
                  name={v.data.name}
                  description={v.data.description}
                  image={v.data.mainImage}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;