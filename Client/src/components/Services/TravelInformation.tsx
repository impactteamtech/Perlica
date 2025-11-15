import type { JSX } from 'react'
import { useState } from 'react'
import OptionCard from './OptionCard';
import type { TravelInfo } from '../../lib/types';

const TravelInformation = (): JSX.Element => {
  const travelInfo: TravelInfo[] = [
    {
      infoId: 1,
      title: "Visa Requirements",
      text: "Understanding visa requirements is crucial for a smooth entry into Kenya. Here are some key points to consider",
      icon: "/travel_info/passport.png",
      options: [
        {
          id: 1,
          optionName: "Who needs a visa?",
          description: "Most travelers to Kenya require a visa, except for citizens of certain countries who are eligible for visa-free entry or visa on arrival."
        },
        {
          id: 2,
          optionName: "Type of Visa",
          description: "The most common type of visa for tourists is the eVisa, which can be obtained online before your trip."
        },
        {
          id: 3,
          optionName: "Documentation required",
          description: "To apply for a visa, you'll typically need a valid passport (with at least six months of validity)."
        },
        {
          id: 4,
          optionName: "How to apply",
          description: "You can apply for a Kenyan visa online through the official eVisa portal or at a Kenyan embassy or consulate in your home country."
        },
        {
          id: 5,
          optionName: "Useful Link",
          description: "https://evisa.go.ke/evisa.html"
        }
      ]
    },
    {
      infoId: 2,
      title: "Health and Safety",
      icon: "/travel_info/health.png",
      text: "Prioritizing your health and safety while traveling in Kenya is essential. Here are some important considerations to keep in mind",
      options: [
        {
          id: 1,
          optionName: "Health precautions",
          description: "Before traveling to Kenya, it's advisable to consult with a healthcare provider about recommended vaccinations and health precautions. Common vaccinations include yellow fever."
        },
        {
          id: 2,
          optionName: "Emergency contacts",
          description: "Familiarize yourself with local emergency numbers, including those for medical emergencies, police, and fire services."
        },
        {
          id: 3,
          optionName: "Travel insurance",
          description: "Consider purchasing comprehensive travel insurance that covers medical emergencies, trip cancellations, and lost belongings."
        }
      ]
    },
    {
      infoId: 3,
      title: "Best time to visit",
      icon: "/travel_info/date.png",
      text: "Kenya's diverse climate and wildlife make it a year-round destination, but certain times of the year are particularly favorable for specific activities. Here are some insights to help you plan your visit",
      options: [
        {
          id: 1,
          optionName: "Climate information",
          description: "Kenya has a diverse climate, with variations depending on the region. Generally, the country experiences two main seasons: the dry season (June to October) and the wet season (March to May and November to December)."
        },
        {
          id: 2,
          optionName: "Tourist seasons",
          description: "High season runs from June to October (lots of tourists, higher prices).",
        },
        {
          id: 3,
          optionName: "Events and festivals",
          description: "Special cultural events that attract visitors include the Lamu Cultural Festival, Maasai Mara Wildebeest Migration."
        }
      ]
    },
    {

      infoId:4,
      title:'FAQ',
      icon:"/travel_info/faq.png",
      text:"",
      options:[
        {
          id:1,
          optionName:"Do you offer guided tours or activities?",
          description:"Yes, we offer a variety of guided tours and activities to enhance your experience in Kenya."
        },
        {
          id:2,
          optionName:"Can I customize my travel itinerary?",
          description:"Yes, we offer customizable travel itineraries to suit your preferences and interests.",
        },
        {
          id:3,
          optionName:"Are airport transfers included?",
          description:"Yes, airport transfers are included in your booking.",
        },
        {
          id:4,
          optionName:"Can I modify or cancel my booking?",
          description:"Yes, you can modify or cancel your booking according to our policy.",
        },
        {
          id:5,
          optionName:"What payment methods are accepted?",
          description:"We accept various payment methods, including credit cards, bank transfers, and online payment platforms."
        },
        {
          id:6,
          optionName:"Will I receive a confirmation email after booking?",
          description:"Yes, you will receive a confirmation email with your booking details shortly after completing your reservation."
        }

      ]
    }
  ];

  const [selectedInfoId, setSelectedInfoId] = useState<number>(1);
  const [showAll, setShowAll] = useState<boolean>(false);

  const handleSelect = (id: number) => {
    setSelectedInfoId(id);
    setShowAll(false);
  };

  // Derive current info and visible options
  const selectedInfo = travelInfo.find((i) => i.infoId === selectedInfoId);
  const options = selectedInfo?.options ?? [];
  // If options length is odd and greater than 1, show an even number initially (for neat 2-col grid)
  let initialVisible = options.length;
  if (options.length > 1 && options.length % 2 === 1) {
    initialVisible = options.length - 1;
  }
  const shouldTruncate = options.length > initialVisible && !showAll;
  const visible = shouldTruncate ? options.slice(0, initialVisible) : options;
  const isFAQ = selectedInfo?.title === 'FAQ';
  const remaining = Math.max(0, options.length - initialVisible);

  return (
  <section className="w-full flex flex-col gap-6 px-4 sm:px-6 lg:px-8 pt-80 md:pt-36">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl title-font font-mono color-primary mb-4 tracking-tight">
          TRAVEL INFORMATION
        </h1>

      </div>
      <div className='w-full flex flex-col lg:flex-row gap-6 lg:gap-8'>
        {/* left part . */}
        <div className='w-full lg:w-1/2 relative'>
          {/* top part */}
          <div className='w-full flex items-start gap-4 sm:gap-6 lg:gap-10'>
            <div className='hidden sm:flex flex-col items-center' aria-hidden="true">
              {/* Decorative timeline: ring with pulsing center and gradient line */}
              <div className='relative flex items-center justify-center'>
                <span className='block h-10 w-10 rounded-full bg-gradient-to-br from-secondary/60 to-secondary/30 ring-2 ring-secondary/50 shadow-md' />
                <span className='absolute h-3 w-3 rounded-full bg-secondary animate-pulse' />
              </div>
              <div className='mt-2 h-48 w-1 rounded-full bg-gradient-to-b from-secondary/40 via-secondary/30 to-transparent' />
            </div>

            <div className='flex-1'>
              <div className="p-1 bg-gradient-to-br from-secondary/40 via-secondary/30 to-transparent shadow-lg transition-transform transform hover:scale-105 rounded-xl">
                <img
                  className='w-full h-auto object-cover block rounded-lg'
                  src="/travel_info/visa_requirement.jpg"
                  alt="Visa requirements"
                />
              </div>
            </div>
          </div>
          {/* bottom part */}
          <div className='grid grid-cols-2 gap-3 mt-4 lg:flex lg:absolute lg:top-80'>
            <div className="relative lg:bottom-10 w-full">
              <div className="w-full h-48 sm:h-60 md:h-72 lg:w-80 lg:h-80 overflow-hidden p-1 bg-gradient-to-br from-green-600/40 via-green-600/20 to-transparent shadow-lg transition-transform transform hover:scale-105 rounded-xl">
                <img
                  className='w-full h-full object-cover block rounded-lg'
                  src="/travel_info/health_and_safety.jpg"
                  alt="Health and safety"
                />
              </div>
            </div>
            <div className='w-full'>
              <div className="w-full h-40 sm:h-48 md:h-56 lg:w-90 lg:h-70 overflow-hidden p-1 bg-gradient-to-br from-green-800/30 via-green-800/20 to-transparent shadow-inner transition-transform transform hover:scale-105 rounded-xl">
                <img
                  className='w-full h-full object-cover block rounded-lg'
                  src="/travel_info/best_time.jpg"
                  alt="Best time to visit"
                />
              </div>
            </div>
          </div>
        </div>


        {/* right part . */}
        <div className='w-full lg:w-1/2'>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 lg:mb-12">
            {travelInfo.map((info) => (
              <button
                key={info.infoId}
                onClick={() => handleSelect(info.infoId)}
                className={`flex items-center gap-3 px-4  rounded-xl sm:px-6 py-3 sm:py-4 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  selectedInfoId === info.infoId
                    ? 'bg-secondary text-white'
                    : 'border border-black'
                }`}
              >
                <img
                  className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                    selectedInfoId === info.infoId ? 'brightness-0 invert' : ''
                  }`}
                  src={info.icon}
                  alt={info.title}
                />
                <span className="font-semibold text-base sm:text-lg whitespace-nowrap">
                  {info.title}
                </span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-6 lg:gap-8 max-w-7xl mx-auto w-full">
            <div className="lg:w-full">
              {/* Options list/grid */}
              <div className={isFAQ ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 auto-rows-fr'}>
                {visible.map((option, index) => (
                  <OptionCard
                    key={option.id}
                    index={index}
                    option={option}
                    title={selectedInfo?.title ?? ''}
                  />
                ))}
              </div>

              {/* Show more / Show less */}
              {options.length > initialVisible && (
                <div className="w-full text-center mt-4 sm:mt-6">
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className={`inline-flex items-center px-4 rounded-lg sm:px-5 py-2.5 transition text-sm font-medium ${
                      showAll
                        ? 'bg-secondary/60 hover:bg-transparent hover:text-black hover:border-black text-white border-1 border-white'
                        : 'hover:bg-secondary/70 hover:border-white hover:text-white border-black border-1'
                    }`}
                  >
                    {showAll ? 'Show less' : `Show ${remaining} more`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
     
     
    </section>
  );
};

export default TravelInformation;