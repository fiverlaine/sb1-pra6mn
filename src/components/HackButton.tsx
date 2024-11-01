import React from 'react';

interface HackButtonProps {
  onClick: () => void;
  disabled: boolean;
  text: string;
}

export const HackButton = ({ onClick, disabled, text }: HackButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300 relative
        overflow-hidden group ${
          disabled 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'bg-green-500 hover:bg-green-600 active:scale-95 hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]'
        }`}
    >
      <span className="relative z-10">{text}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/30 to-green-400/0 
        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </button>
  );
};