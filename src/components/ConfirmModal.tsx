import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
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
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 p-8 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
              <RotateCcw className="w-8 h-8 text-amber-500 animate-spin-slow" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Are you sure?</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              You will lose all your current work and settings. This action cannot
              be undone.
            </p>
            <div className="flex flex-col w-full gap-3">
              <button
                onClick={onConfirm}
                className="w-full py-3.5 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                Yes, Start New
              </button>
              <button
                onClick={onClose}
                className="w-full py-3.5 bg-slate-50 text-slate-500 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-all active:scale-[0.98]"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
