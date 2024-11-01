import React, { useState, useEffect, useCallback } from 'react';
import { Star, Timer, Bomb } from 'lucide-react';
import { MatrixRain } from './components/MatrixRain';
import { LoadingBar } from './components/LoadingBar';
import { HackButton } from './components/HackButton';

function App() {
  const [hacking, setHacking] = useState(false);
  const [stars, setStars] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hackingText, setHackingText] = useState('HACKEAR MINES');
  const [progress, setProgress] = useState(0);

  const grid = Array(25).fill(null);

  useEffect(() => {
    if (hacking) {
      const texts = [
        'INICIANDO HACK...', 
        'ANALISANDO PADRÕES...', 
        'DECODIFICANDO ALGORITMO...', 
        'BYPASSANDO SEGURANÇA...', 
        'GERANDO SEQUÊNCIA...'
      ];
      let i = 0;
      const interval = setInterval(() => {
        setHackingText(texts[i % texts.length]);
        i++;
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setHackingText('HACKEAR MINES');
      setProgress(0);
    }
  }, [hacking]);

  const hackMines = useCallback(() => {
    setHacking(true);
    setStars([]);
    
    // Progress animation
    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(progressInterval);
        const randomStars = Array(5)
          .fill(0)
          .map(() => Math.floor(Math.random() * 25));
        setStars(randomStars);
        setHacking(false);
      }
    }, interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#000913] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Matrix Effect */}
      <MatrixRain isActive={hacking} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.1),transparent_50%)]" />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="text-6xl font-bold mb-12 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent filter drop-shadow-lg">
          Bet<span className="text-green-400">∆</span>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 mb-6 text-xl bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
          <Timer className="text-red-500" />
          <span>Válido: {timeLeft} segundos</span>
        </div>

        {/* Mines Count */}
        <div className="flex items-center gap-2 mb-8 text-xl bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
          <Bomb className="text-gray-400" />
          <span>Jogar: 3 Minas</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-3 mb-8 p-4 bg-black/20 rounded-2xl backdrop-blur-sm">
          {grid.map((_, index) => (
            <div
              key={index}
              className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 relative
                ${hacking ? 'animate-pulse shadow-[0_0_15px_rgba(0,255,0,0.3)]' : ''}
                ${stars.includes(index) ? 'bg-yellow-500' : 'bg-[#1a2c4d]'}
                before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b
                ${stars.includes(index) 
                  ? 'before:from-yellow-400/50 before:to-yellow-600/50 shadow-[0_0_20px_rgba(255,200,0,0.3)]' 
                  : 'before:from-blue-400/10 before:to-transparent shadow-lg'}`}
            >
              <div className={`absolute inset-[2px] rounded-[10px] flex items-center justify-center
                ${stars.includes(index) ? 'bg-yellow-500' : 'bg-[#1a2c4d]'}`}>
                {stars.includes(index) && (
                  <Star className="w-8 h-8 text-white animate-bounce" />
                )}
                {!stars.includes(index) && (
                  <div className="w-10 h-10 rounded-full bg-[#142039]" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Loading Bar */}
        {hacking && (
          <div className="w-full max-w-md mb-8">
            <LoadingBar progress={progress} />
            <div className="text-center mt-2 text-green-400 font-mono">
              {hackingText}
            </div>
          </div>
        )}

        {/* Hack Button */}
        <HackButton
          onClick={hackMines}
          disabled={hacking}
          text={hackingText}
        />
      </div>
    </div>
  );
}

export default App;