import React from 'react';

export const LoadingBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full max-w-md bg-black/30 h-2 rounded-full overflow-hidden backdrop-blur-sm">
      <div
        className="h-full bg-gradient-to-r from-green-500 to-green-300 transition-all duration-300 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
