import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { Sparkles, ArrowRight, Volume2, VolumeX, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LuxuryIntroProps {
  onComplete: () => void;
}

export const LuxuryIntro: React.FC<LuxuryIntroProps> = ({ onComplete }) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(6);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const luxuryPhrases = [
    "SEJA BEM-VINDO À DUA MODAS",
    "MODA BEBÊ, INFANTIL E JUVENIL DE ALTO PADRÃO",
    "SÃO ROQUE - SP • A LOJA PERFEITA PARA OS SEUS FILHOS"
  ];

  // Trigger luxury confetti sparkles on start
  useEffect(() => {
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#C5A059', '#B87D7B', '#E8D4D3', '#8B9E87']
      });
    } catch {
      // safe fallback
    }
  }, []);

  // Timer Countdown (6 seconds)
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Phrase cycler every 2 seconds
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % luxuryPhrases.length);
    }, 2000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(phraseInterval);
    };
  }, []);

  const handleFinish = () => {
    setIsClosing(true);
    try {
      confetti({
        particleCount: 50,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#C5A059', '#B87D7B', '#2C221E']
      });
    } catch {
      // safe
    }

    setTimeout(() => {
      onComplete();
    }, 600);
  };

  // Ultra-lightweight canvas particles without heavy shadow blur for 60fps smoothness
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 25 lightweight golden/pink floating dots (no expensive canvas shadowBlur)
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#C5A059' : '#B87D7B',
      alpha: Math.random() * 0.5 + 0.2,
      speedY: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const progressPercent = ((6 - secondsLeft) / 6) * 100;

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between py-8 px-4 bg-[#FFFFFF] text-[#2C221E] overflow-hidden select-none"
        >
          {/* Particle Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Clean Soft Radial Glow Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FAF6EF] via-[#FFFFFF] to-[#F8F5F2] pointer-events-none" />

          {/* Soft Golden Shimmer Sweep */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-[#C5A059]/10 to-transparent -rotate-45 animate-light-ray" />
          </div>

          {/* Top Header Bar inside Splash */}
          <div className="w-full max-w-6xl flex items-center justify-between z-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8F5F2] border border-[#C5A059]/30 text-xs text-[#2C221E] font-medium tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin" style={{ animationDuration: '6s' }} />
              <span className="font-semibold text-[#8F5553]">EXPERIÊNCIA EXCLUSIVA</span>
            </div>

            {/* Skip Button */}
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C221E] hover:bg-[#C5A059] text-white hover:text-[#2C221E] border border-[#2C221E] text-xs font-semibold tracking-widest transition-all duration-300 shadow-md cursor-pointer group"
            >
              <span>PULAR PARA A LOJA</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Center Main Stage: Large Official Logo & Effects */}
          <div className="relative flex flex-col items-center justify-center my-auto z-10 max-w-2xl text-center px-4">
            {/* Glowing Soft Backdrop Aura behind Logo */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#E8D4D3]/40 blur-3xl pointer-events-none" />

            {/* Large Official Vector Logo on Clean White Background */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 mb-6 drop-shadow-md"
            >
              <Logo variant="intro" size="intro" />
            </motion.div>

            {/* Animated Luxury Cycling Phrase */}
            <div className="h-10 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={phraseIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="font-serif-luxury text-sm sm:text-lg md:text-xl font-bold tracking-[0.2em] text-[#8F5553] uppercase"
                >
                  {luxuryPhrases[phraseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Timer & Progress Bar (6 Seconds) */}
          <div className="w-full max-w-md z-10 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-xs tracking-widest text-stone-500 font-sans-clean font-medium">
              <span>ABRINDO A LOJA EM</span>
              <span className="text-[#B87D7B] font-bold text-base font-mono">
                0{secondsLeft}s
              </span>
            </div>

            {/* Golden Progress Bar */}
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-[#C5A059]/30 shadow-inner">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "linear" }}
                className="h-full bg-gradient-to-r from-[#B87D7B] via-[#C5A059] to-[#8F5553] rounded-full shadow-xs"
              />
            </div>

            <p className="text-[11px] text-stone-400 font-medium tracking-wider uppercase">
              Dua Modas • Moda Bebê, Infantil e Juvenil
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
