import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Palette,
  ShieldCheck,
  Layout,
  Sun,
  Moon,
  Check,
  RotateCcw,
  X,
} from "lucide-react";

interface SettingsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  deviceTheme: "light" | "dark";
  setDeviceTheme: (theme: "light" | "dark") => void;
  isSafeAreaEnabled: boolean;
  setIsSafeAreaEnabled: (enabled: boolean) => void;
  showStatusBar: boolean;
  setShowStatusBar: (show: boolean) => void;
  showNotch: boolean;
  setShowNotch: (show: boolean) => void;
  isImageLocked: boolean;
  setIsImageLocked: (locked: boolean) => void;
  imageZoom: number;
  setImageZoom: (zoom: number) => void;
  uploadedImage: string | null;
  handleResetAll: () => void;
}

export const SettingsPopover: React.FC<SettingsPopoverProps> = ({
  isOpen,
  onClose,
  deviceTheme,
  setDeviceTheme,
  isSafeAreaEnabled,
  setIsSafeAreaEnabled,
  showStatusBar,
  setShowStatusBar,
  showNotch,
  setShowNotch,
  isImageLocked,
  setIsImageLocked,
  imageZoom,
  setImageZoom,
  uploadedImage,
  handleResetAll,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-[4px] z-[90] lg:bg-transparent lg:backdrop-blur-none"
          />

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed inset-x-4 bottom-6 lg:absolute lg:top-full lg:left-0 lg:bottom-auto lg:mt-3 lg:w-80 bg-white/95 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.25)] border border-slate-200/50 overflow-hidden z-[100]"
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Device Configuration
              </span>
              <button
                onClick={onClose}
                className="p-1 hover:bg-slate-200 rounded-md transition-colors text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-2 space-y-1">
              {/* Theme Toggle */}
              <div className="p-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block px-1">
                  Appearance
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDeviceTheme("light")}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border transition-all ${
                      deviceTheme === "light"
                        ? "bg-white border-indigo-200 shadow-sm text-indigo-600 ring-2 ring-indigo-500/10"
                        : "bg-slate-50/50 border-transparent text-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold">Light</span>
                    {deviceTheme === "light" && (
                      <Check className="w-3 h-3 ml-auto" />
                    )}
                  </button>
                  <button
                    onClick={() => setDeviceTheme("dark")}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border transition-all ${
                      deviceTheme === "dark"
                        ? "bg-slate-900 border-slate-800 shadow-lg text-white"
                        : "bg-slate-50/50 border-transparent text-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold">Dark</span>
                    {deviceTheme === "dark" && (
                      <Check className="w-3 h-3 ml-auto" />
                    )}
                  </button>
                </div>
              </div>

              <div className="h-px bg-slate-100 mx-2 my-1" />

              {/* Toggles */}
              <div className="p-1 space-y-0.5">
                <button
                  onClick={() => setIsSafeAreaEnabled(!isSafeAreaEnabled)}
                  className="w-full p-2.5 flex items-center justify-between rounded-xl hover:bg-slate-50 transition-colors group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isSafeAreaEnabled
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-700">
                        Safe Area
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium">
                        Device-specific padding
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-9 h-5 rounded-full relative transition-colors ${
                      isSafeAreaEnabled ? "bg-indigo-600" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${
                        isSafeAreaEnabled ? "left-5" : "left-1"
                      }`}
                    />
                  </div>
                </button>

                <button
                  onClick={() => setShowStatusBar(!showStatusBar)}
                  className="w-full p-2.5 flex items-center justify-between rounded-xl hover:bg-slate-50 transition-colors group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        showStatusBar
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <div className="w-4 h-4 border-2 border-current rounded-sm opacity-60 flex flex-col gap-0.5 p-0.5">
                        <div className="w-full h-[1px] bg-current" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-700">
                        Status Bar
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium">
                        Time & Connectivity
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-9 h-5 rounded-full relative transition-colors ${
                      showStatusBar ? "bg-indigo-600" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${
                        showStatusBar ? "left-5" : "left-1"
                      }`}
                    />
                  </div>
                </button>

                <button
                  onClick={() => setShowNotch(!showNotch)}
                  className="w-full p-2.5 flex items-center justify-between rounded-xl hover:bg-slate-50 transition-colors group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        showNotch
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <div className="w-4 h-1.5 bg-current rounded-full opacity-60" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-700">
                        Display Notch
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium">
                        Camera Cut-out
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-9 h-5 rounded-full relative transition-colors ${
                      showNotch ? "bg-indigo-600" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${
                        showNotch ? "left-5" : "left-1"
                      }`}
                    />
                  </div>
                </button>

                {/* Drag Mode Toggle - Mobile Only */}
                <div className="lg:hidden">
                  <div className="h-px bg-slate-100 mx-2 my-1" />
                  <button
                    onClick={() => setIsImageLocked(!isImageLocked)}
                    className="w-full p-2.5 flex items-center justify-between rounded-xl hover:bg-slate-50 transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          !isImageLocked
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <Layout className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-700">
                          Drag Mode
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium">
                          {isImageLocked
                            ? "Locked (Gesture: Long-tap)"
                            : "Unlocked for positioning"}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-9 h-5 rounded-full relative transition-colors ${
                        !isImageLocked ? "bg-indigo-600" : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${
                          !isImageLocked ? "left-5" : "left-1"
                        }`}
                      />
                    </div>
                  </button>
                </div>

                {/* Image Zoom Control - Visible on all screens */}
                {uploadedImage && (
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <div className="p-2.5 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                      <div className="flex items-center justify-between mb-3 px-1">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-slate-700">
                            Image Scale
                          </span>
                          <span className="text-[9px] text-slate-400 font-medium">
                            Fine-tune positioning
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-indigo-600 bg-white border border-indigo-100 px-2 py-0.5 rounded-lg shadow-sm">
                          {Math.round(imageZoom * 100)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-3 px-1">
                        <span className="text-[10px] text-slate-400 font-bold">
                          A
                        </span>
                        <input
                          type="range"
                          min="0.1"
                          max="3"
                          step="0.01"
                          value={imageZoom}
                          onChange={(e) =>
                            setImageZoom(parseFloat(e.target.value))
                          }
                          className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <span className="text-sm text-slate-400 font-bold">
                          A
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-50/50 p-2.5 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                  Live Sync Active
                </span>
              </div>
              <button
                onClick={handleResetAll}
                className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-200/70 rounded-md transition-all group"
                title="Reset all settings to default"
              >
                <span className="text-[9px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors uppercase">
                  Reset
                </span>
                <RotateCcw className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 group-active:rotate-[-180deg] transition-all duration-500" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
