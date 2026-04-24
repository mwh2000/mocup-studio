/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { forwardRef, useRef } from 'react';
import { motion } from 'motion/react';
import Draggable from 'react-draggable';
import { DeviceConfig } from '../types';

interface DeviceFrameProps {
  config: DeviceConfig;
  imageUrl: string | null;
  isSafeAreaEnabled: boolean;
}

export const DeviceFrame = forwardRef<HTMLDivElement, DeviceFrameProps>(
  ({ config, imageUrl, isSafeAreaEnabled }, ref) => {
    const isLaptop = config.category === 'laptop';
    const draggableNodeRef = useRef(null);

    return (
      <div className="flex flex-col items-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`relative p-[4px] bg-[#1a1c1e] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-800/50 ${
            isLaptop ? 'origin-bottom' : ''
          }`}
          style={{
            borderRadius: config.frameStyle.borderRadius,
            width: `${config.dimensions.width}px`,
            height: `${config.dimensions.height}px`,
          }}
        >
          {/* Outer Frame / Bezel */}
          <div
            className="w-full h-full bg-[#0c0c0c] relative overflow-hidden flex items-center justify-center ring-1 ring-white/10"
            style={{
              borderRadius: `calc(${config.frameStyle.borderRadius} - 4px)`,
            }}
          >
            {/* Screen Content Container */}
            <div
              className="bg-slate-900 overflow-hidden relative shadow-inner w-full h-full"
              style={{
                borderRadius: config.screenStyle.borderRadius,
              }}
            >
              {imageUrl ? (
                <Draggable nodeRef={draggableNodeRef} bounds={false}>
                  <div 
                    ref={draggableNodeRef} 
                    className="absolute inset-0 cursor-move"
                    style={{
                      top: isSafeAreaEnabled ? `${config.safeAreaHeight}px` : '0',
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover pointer-events-none select-none transition-all duration-300"
                      crossOrigin="anonymous"
                    />
                  </div>
                </Draggable>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-12 text-center flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center animate-pulse">
                    <div className="w-6 h-6 border-2 border-slate-600 rounded-sm" />
                  </div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-widest leading-relaxed">
                    Upload to preview <br />
                    <span className="opacity-50 text-[10px]">High Resolution</span>
                  </p>
                </div>
              )}

              {/* Status Bar Mockup (Mobile only) */}
              {!isLaptop && (
                <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-between px-6 z-10 pointer-events-none">
                  <div className="text-[10px] font-bold text-white/40 tracking-tight">9:41</div>
                  <div className="flex gap-1 items-center opacity-40">
                    <div className="w-3.5 h-1.5 border border-white rounded-[2px]" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </div>
              )}

              {/* Punch Hole Camera */}
              {config.camera.type === 'punch-hole' && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#050505] rounded-full z-30 shadow-inner flex items-center justify-center border border-white/5">
                  <div className="w-1 h-1 bg-indigo-900/40 rounded-full blur-[0.5px]"></div>
                </div>
              )}

              {/* Notch / Dynamic Island */}
              {config.camera.type === 'notch' && (
                <div
                  className={`absolute left-1/2 -translate-x-1/2 bg-black z-30 flex items-center justify-center ${isLaptop ? 'top-[-2px] rounded-b-xl' : 'top-3 rounded-full'}`}
                  style={{
                    width: isLaptop ? '180px' : '85px',
                    height: isLaptop ? '28px' : '28px',
                  }}
                >
                  <div className="flex gap-4 items-center">
                    <div className={`h-1 bg-white/10 rounded-full ${isLaptop ? 'w-10' : 'w-6'}`} />
                    <div className="w-1.5 h-1.5 bg-indigo-900/40 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Antenna Lines (Mobile only) */}
            {!isLaptop && (
              <>
                <div className="absolute top-12 -left-px w-1 h-8 bg-slate-800/50"></div>
                <div className="absolute bottom-12 -left-px w-1 h-8 bg-slate-800/50"></div>
                <div className="absolute top-20 -right-px w-1 h-8 bg-slate-800/50"></div>
              </>
            )}
          </div>

          {/* Side Buttons (Mobile only) */}
          {!isLaptop && (
            <>
              <div className="absolute top-32 -right-[2px] w-[3px] h-12 bg-[#2d3034] rounded-l-sm border-r border-slate-600/30" />
              <div className="absolute top-48 -right-[2px] w-[3px] h-24 bg-[#2d3034] rounded-l-sm border-r border-slate-600/30" />
            </>
          )}
        </motion.div>

        {/* Laptop Base (MacBook Style) */}
        {isLaptop && (
          <div className="relative -mt-1 w-[110%] h-8 bg-[#1a1c1e] rounded-b-xl shadow-xl flex justify-center">
            <div className="absolute top-0 w-32 h-2 bg-[#0c0c0c] rounded-b-lg" />
          </div>
        )}
      </div>
    );
  }
);

DeviceFrame.displayName = 'DeviceFrame';
