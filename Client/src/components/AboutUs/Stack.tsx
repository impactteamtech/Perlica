import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useRef, useCallback, useEffect } from 'react';
import '../../index.css';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  isTopCard: boolean;
  cardDimensions: { width: number; height: number };
}

function CardRotate({ children, onSendToBack, sensitivity, isTopCard, cardDimensions }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smoother spring transforms for better feel
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), springConfig);
  
  // Scale effect when dragging
  const scale = useSpring(useTransform(x, [-100, 0, 100], [1.02, 1, 1.02]), springConfig);

  const handleDragEnd = useCallback((_: never, info: { offset: { x: number; y: number } }) => {
    const dragDistance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    
    if (dragDistance > sensitivity) {
      onSendToBack();
    }
    
    // Smooth return to center
    x.set(0);
    y.set(0);
  }, [sensitivity, onSendToBack, x, y]);

  return (
    <motion.div
      className="card-rotate"
      style={{ 
        x, 
        y, 
        rotateX, 
        rotateY,
        scale,
        zIndex: isTopCard ? cardDimensions.height + 1 : cardDimensions.height - 1, // Better z-index management
      }}
      drag={isTopCard}
      dragConstraints={{ 
        top: 0, 
        right: 0, 
        bottom: 0, 
        left: 0 
      }}
      dragElastic={0.4}
      dragTransition={{ power: 0.2, timeConstant: 200 }}
      whileHover={isTopCard ? { scale: 1.05 } : {}}
      whileTap={isTopCard ? { cursor: 'grabbing', scale: 1.02 } : {}}
      onDragEnd={handleDragEnd}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string; title?: string; description?: string }[];
  animationConfig?: { stiffness: number; damping: number };
  maxRotation?: number;
  onCardClick?: (cardId: number) => void;
}

export default function Stack({
  randomRotation = true,
  sensitivity = 80,
  cardDimensions = { width: 280, height: 350 },
  cardsData = [],
  animationConfig = { stiffness: 300, damping: 25 },
  sendToBackOnClick = true,
  maxRotation = 8,
  onCardClick
}: StackProps) {
  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          { 
            id: 1, 
            img: '/safari_animals/animal_1.jpg',
          },
          { 
            id: 2, 
            img: '/safari_animals/animal_2.jpg',
          },
          { 
            id: 3, 
            img: '/safari_animals/animal_3.jpg',
          },
          { 
            id: 4, 
            img: '/safari_animals/animal_4.jpg',
          }
        ]
  );

  const stackRef = useRef<HTMLDivElement>(null);
  const [topCardId, setTopCardId] = useState<number>(cards[cards.length - 1]?.id || 0);

  // Update top card when cards change
  useEffect(() => {
    if (cards.length > 0) {
      setTopCardId(cards[cards.length - 1].id);
    }
  }, [cards]);

  const sendToBack = useCallback((id: number) => {
    setCards(prev => {
      const newCards = [...prev];
      const index = newCards.findIndex(card => card.id === id);
      if (index === -1) return newCards;
      
      // Remove the card and put it at the beginning (back of stack)
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  }, []);

  const handleCardClick = useCallback((cardId: number) => {
    if (sendToBackOnClick) {
      sendToBack(cardId);
    }
    onCardClick?.(cardId);
  }, [sendToBackOnClick, sendToBack, onCardClick]);

  return (
    <div
      ref={stackRef}
      className="stack-container relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 1200
      }}
    >
      {cards.map((card, index) => {
        const isTopCard = card.id === topCardId;
        const depth = index; // Depth is now simply the index (0 = back, last = front)
        
        const randomRotate = randomRotation ? 
          Math.random() * maxRotation * 2 - maxRotation : 0;

        return (
          <CardRotate 
            key={card.id} 
            onSendToBack={() => sendToBack(card.id)} 
            sensitivity={sensitivity}
            isTopCard={isTopCard}
            cardDimensions={cardDimensions}
          >
            <motion.div
              className="card relative cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm safari_animals border-10 border-secondary/20"
              onClick={() => handleCardClick(card.id)}
              animate={{
                rotateZ: depth * 2 + randomRotate,
                scale: 1 - depth * 0.08,
                y: -depth * 8,
                transformOrigin: 'center',
                zIndex: cards.length - depth // Ensure proper stacking
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
                mass: 0.8
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
                zIndex: cards.length - depth // CSS z-index for proper stacking
              }}
              whileHover={isTopCard ? {
                boxShadow: "0 5px 8px -6px rgba(0, 0, 0, 0.5)"
              } : {}}
            >
              {/* Card Image */}
              <motion.img 
                src={card.img} 
                alt={`card-${card.id}`} 
                className="card-image w-full h-full"
                whileHover={isTopCard ? { scale: 1.1 } : {}}
                transition={{ duration: 0.4 }}
              />
              
              {/* Card Overlay - Only show on top card */}
              {isTopCard && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            
                  
                  {/* Drag Hint for Top Card */}
                  <motion.div
                    className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                  >
                    Drag me
                  </motion.div>
                </div>
              )}
              
              {/* Card Index Indicator */}
              <div className="absolute top-4 left-4 bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold backdrop-blur-sm">
                {cards.length - depth}
              </div>
            </motion.div>
          </CardRotate>
        );
      })}
      
      {/* Stack Counter */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20">
        {cards.length} cards in stack
      </div>
    </div>
  );
}