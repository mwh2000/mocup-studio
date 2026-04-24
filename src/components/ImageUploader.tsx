/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  currentImage: string | null;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageUpload, 
  currentImage,
  onClear 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageUpload(url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      onImageUpload(url);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!currentImage ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="group relative cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center w-full py-8 border-2 border-dashed border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400 hover:bg-white hover:shadow-sm">
              <Upload className="w-5 h-5 text-slate-300 mb-3 group-hover:text-indigo-500 transition-colors" />
              <p className="text-sm font-medium text-slate-500 group-hover:text-slate-700">
                Drop screenshot here
              </p>
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Mockup Live</p>
                <button
                   onClick={() => fileInputRef.current?.click()}
                   className="text-[10px] font-semibold text-indigo-500 hover:text-indigo-600 transition-colors"
                >
                  Replace File
                </button>
              </div>
            </div>
            <button
              onClick={onClear}
              className="p-2 text-slate-300 hover:text-red-400 transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
