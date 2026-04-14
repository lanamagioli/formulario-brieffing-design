/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import BriefingWizard from './components/BriefingWizard';

export default function App() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when step changes
    if (inputRef.current && step < 2) {
      inputRef.current.focus();
    }
  }, [step]);

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        setStep(3);
      }, 2500); // Wait 2.5s then show wizard
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNext = () => {
    if (step === 0 && name.trim()) {
      setStep(1);
    } else if (step === 1 && profession.trim()) {
      setStep(2);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  if (step === 3) {
    return <BriefingWizard userName={name} userProfession={profession} />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      {/* Background Image with Navy Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/fundo-principal.png")' }}
      />
      <div className="absolute inset-0 z-10 bg-[#182A45]/45" />

      {/* Main Content */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="flex flex-col items-center"
              >
                <h1 className="mb-10 text-center text-4xl font-light tracking-tight text-[#FFFFFF] md:text-5xl">
                  Vamos criar algo incrível.
                </h1>
                <div className="relative w-full">
                  <input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Digite seu Nome"
                    className="w-full rounded-2xl border-2 border-[#8FA0A8]/30 bg-[#FFFFFF] px-8 py-5 text-xl text-[#182A45] placeholder-[#8FA0A8] shadow-2xl outline-none transition-all focus:border-[#D46B41] focus:ring-4 focus:ring-[#D46B41]/20"
                    autoFocus
                  />
                  <button
                    onClick={handleNext}
                    disabled={!name.trim()}
                    className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl bg-[#D46B41] text-[#FFFFFF] shadow-md transition-all hover:scale-105 hover:bg-[#c25e36] disabled:pointer-events-none disabled:opacity-40"
                    aria-label="Próximo"
                  >
                    <ArrowRight size={24} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="flex flex-col items-center"
              >
                <h1 className="mb-10 text-center text-4xl font-light tracking-tight text-[#FFFFFF] md:text-5xl">
                  Prazer, <span className="font-medium text-[#FAF5F0]">{name.split(' ')[0]}</span>.
                </h1>
                <div className="relative w-full">
                  <input
                    ref={inputRef}
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Digite sua Profissão"
                    className="w-full rounded-2xl border-2 border-[#8FA0A8]/30 bg-[#FFFFFF] px-8 py-5 text-xl text-[#182A45] placeholder-[#8FA0A8] shadow-2xl outline-none transition-all focus:border-[#D46B41] focus:ring-4 focus:ring-[#D46B41]/20"
                    autoFocus
                  />
                  <button
                    onClick={handleNext}
                    disabled={!profession.trim()}
                    className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl bg-[#D46B41] text-[#FFFFFF] shadow-md transition-all hover:scale-105 hover:bg-[#c25e36] disabled:pointer-events-none disabled:opacity-40"
                    aria-label="Concluir"
                  >
                    <Check size={24} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#D46B41]/20 ring-4 ring-[#D46B41]/10">
                  <Check size={48} className="text-[#D46B41]" />
                </div>
                <h1 className="mb-4 text-4xl font-light tracking-tight text-[#FFFFFF] md:text-5xl">
                  Tudo pronto!
                </h1>
                <p className="text-xl text-[#FAF5F0]/80">
                  Obrigado pelas informações. Seu briefing interativo começará em breve.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 z-30 h-1.5 w-full bg-[#182A45]">
        <motion.div
          className="h-full bg-[#D46B41]"
          initial={{ width: '33.33%' }}
          animate={{ width: `${((step + 1) / 3) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
