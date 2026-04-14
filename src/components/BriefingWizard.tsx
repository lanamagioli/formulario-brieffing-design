import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight } from 'lucide-react';

const WIZARD_STEPS = [
  { id: 'essencia', title: 'A Essência', question: 'Qual é o propósito principal do seu projeto? Conte-nos a história por trás da sua ideia.' },
  { id: 'publico', title: 'O Público', question: 'Quem é o seu público-alvo? Descreva o perfil, os desejos e as dores das pessoas que você quer alcançar.' },
  { id: 'desafio', title: 'O Desafio', question: 'Quais são os maiores desafios que você enfrenta atualmente neste projeto?' },
  { id: 'estilo', title: 'Estilo', question: 'Como você descreveria o estilo visual ou o tom de voz ideal para a sua marca?' },
];

interface BriefingWizardProps {
  userName: string;
  userProfession: string;
}

export default function BriefingWizard({ userName, userProfession }: BriefingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({
    essencia: '',
    publico: '',
    desafio: '',
    estilo: '',
  });

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Finalizar e Enviar
      console.log('Form Data:', formData);
      alert('Briefing enviado com sucesso!');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (index: number) => {
    if (index < currentStep) {
      setCurrentStep(index);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row font-sans bg-[#FAF5F0]">
      {/* Sidebar (Desktop) / Topbar (Mobile) */}
      <div className="sticky top-0 z-50 flex w-full flex-col bg-[#182A45] p-6 shadow-lg md:h-screen md:w-[30%] md:p-10">
        <div className="mb-8 hidden md:block">
          <h2 className="text-2xl font-light text-[#FFFFFF]">Briefing Interativo</h2>
          <p className="mt-2 text-sm text-[#8FA0A8]">Olá, {userName.split(' ')[0]}. Vamos detalhar seu projeto.</p>
        </div>

        {/* Mobile Progress Bar (Horizontal) */}
        <div className="flex items-center justify-between md:hidden">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D46B41]">
              Passo {currentStep + 1} de {WIZARD_STEPS.length}
            </span>
            <span className="text-lg font-medium text-[#FFFFFF]">
              {WIZARD_STEPS[currentStep].title}
            </span>
          </div>
          <div className="flex gap-1">
            {WIZARD_STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  idx === currentStep
                    ? 'bg-[#D46B41]'
                    : idx < currentStep
                    ? 'bg-[#D46B41]/50'
                    : 'bg-[#8FA0A8]/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Navigation Trail (Vertical) */}
        <nav className="hidden flex-1 md:flex md:flex-col md:justify-center">
          <ul className="space-y-8">
            {WIZARD_STEPS.map((step, index) => {
              const isCurrent = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <li
                  key={step.id}
                  className={`flex items-center gap-4 transition-all ${
                    isCompleted ? 'cursor-pointer hover:opacity-80' : ''
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      isCurrent
                        ? 'border-[#D46B41] bg-[#D46B41] text-[#FFFFFF]'
                        : isCompleted
                        ? 'border-[#D46B41] bg-transparent text-[#D46B41] opacity-70'
                        : 'border-[#8FA0A8] bg-transparent text-[#8FA0A8]'
                    }`}
                  >
                    {isCompleted ? <Check size={20} /> : <span className="text-sm font-medium">{index + 1}</span>}
                  </div>
                  <span
                    className={`text-lg transition-colors ${
                      isCurrent
                        ? 'font-bold text-[#FFFFFF]'
                        : isCompleted
                        ? 'font-medium text-[#FAF5F0] opacity-70'
                        : 'font-normal text-[#8FA0A8]'
                    }`}
                  >
                    {step.title}
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-12 lg:p-20">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col"
            >
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#D46B41]">
                {WIZARD_STEPS[currentStep].title}
              </h3>
              <h2 className="mb-8 text-3xl font-light leading-tight text-[#182A45] md:text-4xl">
                {WIZARD_STEPS[currentStep].question}
              </h2>

              <textarea
                value={formData[WIZARD_STEPS[currentStep].id]}
                onChange={(e) => setFormData({ ...formData, [WIZARD_STEPS[currentStep].id]: e.target.value })}
                rows={8}
                placeholder="Escreva sua resposta aqui..."
                className="w-full resize-y rounded-2xl border border-[#8FA0A8]/40 bg-[#FFFFFF] p-6 text-lg text-[#182A45] placeholder-[#8FA0A8] shadow-sm outline-none transition-all focus:border-[#D46B41] focus:ring-4 focus:ring-[#D46B41]/20"
                autoFocus
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Footer */}
          <div className="mt-12 flex items-center justify-between border-t border-[#8FA0A8]/20 pt-8">
            <button
              onClick={handleBack}
              className={`flex items-center rounded-xl px-6 py-3 text-lg font-medium text-[#182A45] transition-colors hover:bg-[#8FA0A8]/10 ${
                currentStep === 0 ? 'invisible' : ''
              }`}
            >
              Voltar
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl bg-[#D46B41] px-8 py-3 text-lg font-medium text-[#FFFFFF] shadow-md transition-all hover:scale-105 hover:bg-[#c25e36]"
            >
              {currentStep === WIZARD_STEPS.length - 1 ? 'Finalizar e Enviar' : 'Próximo'}
              {currentStep !== WIZARD_STEPS.length - 1 && <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
