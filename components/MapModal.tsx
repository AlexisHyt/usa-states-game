import React, { useState } from 'react';
import USAVisx from './USAVisx';
import FranceVisx from './FranceVisx';
import { State } from '@/data/states';
import { Department } from '@/data/departments';
import { GameStatus } from '@/components/StateGuessingGame';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  mapType: 'usa' | 'france';
  currentState?: State;
  currentDepartment?: Department;
  gameStatus: GameStatus;
}

export default function MapModal({
  isOpen,
  onClose,
  mapType,
  currentState,
  currentDepartment,
  gameStatus,
}: MapModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1.5); // Initial zoom level (150%)
  
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3)); // Max zoom: 300%
  };
  
  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5)); // Min zoom: 50%
  };
  
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
    e.preventDefault();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full h-full max-w-full max-h-full p-4 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#000"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        
        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={zoomIn}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            aria-label="Zoom in"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#000"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
          <button
            onClick={zoomOut}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            aria-label="Zoom out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#000"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 12H6"
              />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow flex items-center justify-center overflow-auto" onWheel={handleWheel}>
          {mapType === 'usa' && currentState ? (
            <div className="transform origin-center" style={{ transform: `scale(${zoomLevel})` }}>
              <USAVisx currentState={currentState} gameStatus={gameStatus} fullview={true} />
            </div>
          ) : mapType === 'france' && currentDepartment ? (
            <div className="transform origin-center" style={{ transform: `scale(${zoomLevel})` }}>
              <FranceVisx currentDepartment={currentDepartment} gameStatus={gameStatus} fullview={true} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}