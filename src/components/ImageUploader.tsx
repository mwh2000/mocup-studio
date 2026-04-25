/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  currentImage: string | null;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  currentImage,
  onClear,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

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
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
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
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="group relative cursor-pointer"
          >
            <div
              className={`flex flex-col items-center justify-center w-full py-8 border-2 border-dashed rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 ${
                isDragging
                  ? "border-indigo-500 bg-indigo-50/50"
                  : "border-slate-200 hover:border-indigo-400 hover:bg-white hover:shadow-sm"
              }`}
            >
              <Upload className="w-5 h-5 text-slate-300 mb-3 group-hover:text-indigo-500 transition-colors" />
              <p className="text-sm font-medium text-slate-500 group-hover:text-slate-700">
                Drop Image Here
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
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex items-center justify-between p-4 border rounded-xl shadow-sm cursor-pointer transition-all ${
              isDragging
                ? "bg-indigo-50 border-indigo-400 ring-2 ring-indigo-500/20"
                : "bg-white border-slate-200"
            }`}
          >
            {/* on click the div open file input */}
            <div className="flex items-center gap-4 ">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                <img
                  src={currentImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Mockup Live
                </p>
                <button
                  onClick={onClear}
                  className="text-[10px] font-semibold text-indigo-500 hover:text-indigo-600 transition-colors"
                >
                  Replace File
                </button>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
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
