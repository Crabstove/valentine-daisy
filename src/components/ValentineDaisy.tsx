'use client'

import React, { useState, useRef, useEffect } from 'react';

interface PluckedPetal {
    index: number;
    offsetX: number;
}

const ValentineDaisy = () => {
const [pluckedPetals, setPluckedPetals] = useState<PluckedPetal[]>([]);
const [showSuitcase, setShowSuitcase] = useState(false);
const suitcaseRef = useRef<HTMLDivElement>(null);
  
const messages = [
    "Be my shibari workshop partner",
    "Dinner by the coast",
    "Sunset picnic on a cliff",
    "Raving till sunrise",
    "Sensual spa evening",
    "Lose all our money at a casino",
    "Drive-in movie and stargazing",
    "Cozy cabin weekend in the woods"
];

useEffect(() => {
    if (typeof window !== 'undefined' && document.body) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, []);

  const handlePluckPetal = (index: number) => {
    if (pluckedPetals.includes(pluckedPetals.find(p => p.index === index) as PluckedPetal)) {
      return;
    }
  
    if (!showSuitcase) {
      setShowSuitcase(true);
    }
  
setPluckedPetals(prev => [...prev, {
    index,
    offsetX: Math.random() * 40 - 20
}]);

if (pluckedPetals.length + 1 === messages.length) {
    setTimeout(() => {
    if (typeof window !== 'undefined') {  // Check if we're on client side
        const startPosition = window.scrollY;
        const targetPosition = window.innerHeight;
        const duration = 4000;
        const startTime = Date.now();

        function ease(t: number) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function animate() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        window.scroll(0, startPosition + (targetPosition - startPosition) * ease(progress));

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
        }

        // Ensure body style changes are also client-side only
        if (document.body) {
        document.body.style.overflow = 'auto';
        requestAnimationFrame(animate);
        
        setTimeout(() => {
            document.body.style.overflow = 'hidden';
        }, duration);
        }
    }
    }, 8000);
}
};

  return (
    <div className="w-full min-h-screen relative bg-pink-50">
      <div className="min-h-screen w-full flex items-center justify-center pt-24">
        <div className="flex flex-col items-center space-y-32">
          <div className="relative w-64 h-64">
            <div className="absolute left-1/2 top-1/2 w-2 h-48 bg-green-500 rounded-full transform -translate-x-1/2 translate-y-8" />
            
            <div className="absolute left-1/2 top-1/2 w-16 h-16 bg-yellow-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-yellow-400 z-10" />
            
            {messages.map((message, index) => {
              const angle = (index * 360) / messages.length;
              const pluckedPetal = pluckedPetals.find(p => p.index === index);
              const isPlucked = !!pluckedPetal;
              
              return (
                <div
                  key={index}
                  className={`absolute left-1/2 top-1/2 w-20 h-32 cursor-pointer
                    ${!isPlucked && 'hover:scale-105 transition-transform duration-300'}
                    ${isPlucked ? 'animate-petal-fall' : ''}`}
                  style={{
                    transform: isPlucked ? undefined : `translate(-50%, -50%) rotate(${angle}deg)`,
                    transformOrigin: 'center center',
                    ...(isPlucked && {
                      '--fall-offset-x': `${pluckedPetal.offsetX}px`,
                      '--initial-rotation': `${angle}deg`
                    })
                  }}
                  onClick={() => handlePluckPetal(index)}
                >
                  <div className="relative w-full h-full">
                    <div 
                      className={`absolute inset-0 bg-white shadow-md
                        ${isPlucked ? 'opacity-70' : 'opacity-100'}`}
                      style={{
                        borderRadius: '60% 60% 60% 60% / 70% 70% 40% 40%',
                        transformOrigin: 'center bottom',
                        transform: 'translateY(-40%) rotate(180deg)'
                      }}
                    />
                    
                    <div 
                      className={`absolute inset-0 flex items-center justify-center p-4 text-center
                        transition-opacity duration-1000 ${isPlucked ? 'opacity-100' : 'opacity-0'}`}
                      style={{
                        transform: isPlucked ? `translateY(60%) rotate(180deg)` : 'none',
                        transformOrigin: 'center center'
                      }}
                    >
                      <p className="text-red-500 text-sm font-medium">{message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white px-6 py-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
            <p className="text-lg font-medium text-gray-800 text-center">
              Reveal our next date 🖤
            </p>
          </div>
        </div>
      </div>

      <div 
        ref={suitcaseRef}
        className="min-h-screen w-full flex items-center justify-center pt-24"
      >
        {showSuitcase && (
          <div className="flex flex-col items-center space-y-24">
            <div className="relative" style={{ width: '30vmin', height: '40vmin' }}>
              <div style={{
                position: 'absolute',
                width: '12vmin',
                height: '2vmin',
                background: '#656D6E',
                top: '-20vmin',
                left: '9vmin',
                borderRadius: '2px'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '2vmin',
                  width: '1vmin',
                  height: '20vmin',
                  background: '#7B8486'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '2vmin',
                  left: '11vmin',
                  width: '1vmin',
                  height: '20vmin',
                  background: '#7B8486'
                }} />
              </div>

              <div style={{
                position: 'absolute',
                width: '30vmin',
                height: '40vmin',
                background: '#7DCFB6',
                borderRadius: '4vmin'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '1.5vmin',
                  height: '33vmin',
                  background: '#FFF',
                  opacity: 0.1,
                  top: '4vmin',
                  left: '2.4vmin',
                  boxShadow: '24vmin 0 0 rgba(255,255,255,0.9), 21vmin 0 0 rgba(255,255,255,0.9), 18vmin 0 0 rgba(255,255,255,0.9), 15vmin 0 0 rgba(255,255,255,0.9), 12vmin 0 0 rgba(255,255,255,0.9), 9vmin 0 0 rgba(255,255,255,0.9), 6vmin 0 0 rgba(255,255,255,0.9), 3vmin 0 0 rgba(255,255,255,0.9)'
                }} />
              </div>

              <div style={{
                position: 'absolute',
                width: '3vmin',
                height: '3vmin',
                top: '40vmin',
                left: '3vmin',
                background: '#656D6E',
                borderRadius: '100%',
                boxShadow: '21vmin 0 0 #656D6E'
              }} />

              <div className="absolute top-4 right-4 bg-white p-3 rounded transform -rotate-12 shadow-md border border-gray-200">
                <p className="text-sm font-bold text-gray-800">GERMANY</p>
                <p className="text-xs text-gray-600">VIA AIR ✈️</p>
              </div>
            </div>

            <div className="bg-white px-6 py-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
              <p className="text-lg font-medium text-gray-800 text-center">
                How about all of them? 🖤
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes petalPluck {
          0% {
            transform: translate(-50%, -50%) rotate(var(--initial-rotation));
            opacity: 1;
          }
          15% {
            transform: translate(-50%, calc(-50% - 50px)) rotate(var(--initial-rotation));
          }
          30% {
            transform: translate(-50%, calc(-50% - 150px)) rotate(180deg);
            opacity: 1;
          }
          45% {
            transform: translate(calc(-50% - 60px), calc(-50% - 130px)) rotate(175deg);
            opacity: 1;
          }
          60% {
            transform: translate(calc(-50% + 60px), calc(-50% - 90px)) rotate(185deg);
            opacity: 1;
          }
          75% {
            transform: translate(calc(-50% - 60px), calc(-50% - 40px)) rotate(175deg);
            opacity: 1;
          }
          90% {
            transform: translate(calc(-50% + 60px), calc(-50% + 50vh)) rotate(185deg);
            opacity: 0.7;
          }
          100% {
            transform: translate(-50%, calc(-50% + 120vh)) rotate(180deg);
            opacity: 0;
          }
        }
        
        .animate-petal-fall {
          animation: petalPluck 12s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ValentineDaisy;