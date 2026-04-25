import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { DeviceConfig } from "../types";

interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDevice: DeviceConfig;
}

export const SpecsModal: React.FC<SpecsModalProps> = ({
  isOpen,
  onClose,
  selectedDevice,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10"
          >
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {selectedDevice.name}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors"
              >
                &times;
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Manufacturer
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    {selectedDevice.brand}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Form Factor
                  </p>
                  <p className="text-sm font-semibold text-slate-700 capitalize">
                    {selectedDevice.category}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Canvas Width
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    {selectedDevice.dimensions.width}px
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Canvas Height
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    {selectedDevice.dimensions.height}px
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  {selectedDevice.description}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold transition-all hover:bg-slate-800"
              >
                Close Specifications
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
