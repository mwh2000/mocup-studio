/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import {
  Smartphone,
  Layout,
  Palette,
  ArrowRight,
  Download,
  Laptop,
  ShieldCheck,
  Sun,
  Moon,
  Settings,
  Check,
  X,
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import { toPng } from "html-to-image";
import { DeviceFrame } from "./components/DeviceFrame";
import { ImageUploader } from "./components/ImageUploader";
import { DEVICES } from "./constants/devices";
import Swal from "sweetalert2";

export default function App() {
  const [selectedDevice, setSelectedDevice] = useState(DEVICES.s26_ultra);
  // const [uploadedImage, setUploadedImage] = useState<string | null>(
  //   "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  // );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSafeAreaEnabled, setIsSafeAreaEnabled] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);
  const [deviceTheme, setDeviceTheme] = useState<"light" | "dark">("light");
  const [isImageLocked, setIsImageLocked] = useState(true);
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showNotch, setShowNotch] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const mockupRef = useRef<HTMLDivElement>(null);

  const handleDeviceChange = (deviceId: string) => {
    setSelectedDevice(DEVICES[deviceId]);
  };

  const handleDownload = useCallback(async () => {
    if (mockupRef.current === null) return;

    try {
      // First, ensure all images in the mockup are loaded and have crossOrigin="anonymous"
      // already set in the component. We use toPng with specific options for better compatibility.
      const node = mockupRef.current;
      const dataUrl = await toPng(node, {
        pixelRatio: 4,
        width: node.scrollWidth,
        height: node.scrollHeight,
        filter: (node: any) => {
          // Exclude nodes with data-no-export attribute
          if (
            node.getAttribute &&
            node.getAttribute("data-no-export") === "true"
          ) {
            return false;
          }
          return true;
        },
        style: {
          transform: "scale(1)",
          margin: "0",
          padding: "0",
        },
      });

      const link = document.createElement("a");
      link.download = `mockup_${selectedDevice.id}_${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to export image:", err);
      // Detailed error logging for debugging
      if (err instanceof Error) {
        console.error("Error message:", err.message);
      }
      alert(
        "Unable to export image. This might be due to security restrictions in your browser or an external image failing to load.",
      );
    }
  }, [selectedDevice.id]);

  const handleNewProject = () => {
    // if there is image uploaded, show a confirmation dialog using Swal.
    if (uploadedImage) {
      Swal.fire({
        title: "Are you sure?",
        text: "You will lose all your unsaved work.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, start a new project",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          setSelectedDevice(DEVICES.s26_ultra);
          setUploadedImage(null);
          setImageZoom(1);
          setIsSafeAreaEnabled(false);
          setDeviceTheme("light");
        }
      });
    } else {
      setSelectedDevice(DEVICES.s26_ultra);
      setImageZoom(1);
      setIsSafeAreaEnabled(false);
      setDeviceTheme("light");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-600 selection:text-white flex flex-col overflow-x-hidden">
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase leading-none">
              Mockup Studio
            </span>
            <span className="text-[8px] font-light text-slate-400/80 tracking-widest">
              by Mustafa
            </span>
          </div>
        </div>

        <button
          onClick={handleNewProject}
          className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2"
        >
          New Project
        </button>
      </nav>

      <main className="flex-1 relative z-10 container mx-auto flex flex-col lg:flex-row items-start justify-center pt-0 md:pt-4 pb-8 px-4 md:px-16 lg:px-24 gap-4 lg:gap-24">
        {/* Left Column: Controls */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 md:gap-10 order-2 lg:order-1">
          <header>
            <h1 className="text-4xl font-light text-slate-600 tracking-wide">
              Pick. Fit.{" "}
              <span className="font-semibold text-slate-800">Export.</span>
            </h1>
            <p className="text-slate-500 text-[13px] mt-3 leading-relaxed font-normal max-w-md tracking-widest">
              Ready in seconds, free forever
            </p>
          </header>

          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2">
                <Smartphone className="w-3 h-3" /> Active Profile
              </label>
              <div className="flex flex-wrap gap-1.5">
                {Object.values(DEVICES).map((device) => (
                  <button
                    key={device.id}
                    onClick={() => handleDeviceChange(device.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                      selectedDevice.id === device.id
                        ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                        : "bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {device.category === "laptop" ? (
                      <Laptop className="w-3 h-3" />
                    ) : (
                      <Smartphone className="w-3 h-3" />
                    )}
                    {device.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {/* Device Config Button */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all text-left w-full ${
                    showSettings
                      ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-inner"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${showSettings ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"}`}
                    >
                      <Settings
                        className={`w-4 h-4 ${showSettings ? "animate-spin-slow" : ""}`}
                      />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold">Device Settings</p>
                      <p className="text-[8px] opacity-70 font-medium uppercase tracking-wider">
                        Appearance & Behavior
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${showSettings ? "rotate-90 text-indigo-500" : "text-slate-300"}`}
                  />
                </button>

                <AnimatePresence>
                  {showSettings && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSettings(false)}
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
                            Configuration
                          </span>
                          <button
                            onClick={() => setShowSettings(false)}
                            className="p-1 hover:bg-slate-200 rounded-md transition-colors text-slate-400"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="p-3 space-y-1.5">
                          {/* Theme Toggle */}
                          <button
                            onClick={() =>
                              setDeviceTheme(
                                deviceTheme === "light" ? "dark" : "light",
                              )
                            }
                            className="w-full p-2.5 flex items-center justify-between rounded-xl hover:bg-slate-50 transition-colors group text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${deviceTheme === "light" ? "bg-amber-100 text-amber-600" : "bg-slate-800 text-indigo-400"}`}
                              >
                                {deviceTheme === "light" ? (
                                  <Sun className="w-4 h-4" />
                                ) : (
                                  <Moon className="w-4 h-4" />
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-semibold text-slate-700">
                                  Appearance
                                </span>
                                <span className="text-[9px] text-slate-400 capitalize font-medium">
                                  {deviceTheme} Mode
                                </span>
                              </div>
                            </div>
                            <div
                              className={`w-9 h-5 rounded-full relative transition-colors ${deviceTheme === "dark" ? "bg-indigo-600" : "bg-slate-200"}`}
                            >
                              <div
                                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${deviceTheme === "dark" ? "left-5" : "left-1"}`}
                              />
                            </div>
                          </button>

                          {/* Safe Area Toggle */}
                          <button
                            onClick={() =>
                              setIsSafeAreaEnabled(!isSafeAreaEnabled)
                            }
                            className="w-full p-2.5 flex items-center justify-between rounded-xl hover:bg-slate-50 transition-colors group text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${isSafeAreaEnabled ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"}`}
                              >
                                <ShieldCheck className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-semibold text-slate-700">
                                  Safe Area
                                </span>
                                <span className="text-[9px] text-slate-400 font-medium">
                                  Avoid Notch Overlap
                                </span>
                              </div>
                            </div>
                            <div
                              className={`w-9 h-5 rounded-full relative transition-colors ${isSafeAreaEnabled ? "bg-indigo-600" : "bg-slate-200"}`}
                            >
                              <div
                                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${isSafeAreaEnabled ? "left-5" : "left-1"}`}
                              />
                            </div>
                          </button>

                          <div className="h-px bg-slate-100 mx-2 my-1" />

                          {/* Navbar Toggle */}
                          <button
                            onClick={() => setShowStatusBar(!showStatusBar)}
                            className="w-full p-2.5 flex items-center justify-between rounded-xl hover:bg-slate-50 transition-colors group text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${showStatusBar ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"}`}
                              >
                                <Smartphone className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-semibold text-slate-700">
                                  Device Navbar
                                </span>
                                <span className="text-[9px] text-slate-400 font-medium">
                                  Status & Home Bar
                                </span>
                              </div>
                            </div>
                            <div
                              className={`w-9 h-5 rounded-full relative transition-colors ${showStatusBar ? "bg-indigo-600" : "bg-slate-200"}`}
                            >
                              <div
                                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${showStatusBar ? "left-5" : "left-1"}`}
                              />
                            </div>
                          </button>

                          {/* Notch Toggle */}
                          <button
                            onClick={() => setShowNotch(!showNotch)}
                            className="w-full p-2.5 flex items-center justify-between rounded-xl hover:bg-slate-50 transition-colors group text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${showNotch ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"}`}
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
                              className={`w-9 h-5 rounded-full relative transition-colors ${showNotch ? "bg-indigo-600" : "bg-slate-200"}`}
                            >
                              <div
                                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${showNotch ? "left-5" : "left-1"}`}
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
                                  className={`p-2 rounded-lg ${!isImageLocked ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"}`}
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
                                className={`w-9 h-5 rounded-full relative transition-colors ${!isImageLocked ? "bg-indigo-600" : "bg-slate-200"}`}
                              >
                                <div
                                  className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${!isImageLocked ? "left-5" : "left-1"}`}
                                />
                              </div>
                            </button>
                          </div>
                        </div>

                        <div className="bg-slate-50/50 p-3 flex items-center gap-2 border-t border-slate-100">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                            Live Sync Active
                          </span>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Content Upload
              </label>
              <ImageUploader
                onImageUpload={(url) => {
                  setUploadedImage(url);
                  setImageZoom(1); // Reset zoom on new image
                }}
                currentImage={uploadedImage}
                onClear={() => {
                  setUploadedImage(null);
                  setImageZoom(1);
                }}
              />
            </div>

            {uploadedImage && (
              <div className="flex flex-col gap-3 p-4 bg-white border border-slate-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Image Zoom
                  </label>
                  <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {Math.round(imageZoom * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.01"
                  value={imageZoom}
                  onChange={(e) => setImageZoom(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <p className="text-[9px] text-slate-400 font-medium">
                  Double-click image in preview to reset
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <button
                onClick={handleDownload}
                disabled={!uploadedImage}
                className="px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 text-center flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" /> Export
              </button>
              <button
                onClick={() => setShowSpecs(true)}
                className="px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold shadow-sm hover:bg-slate-50 transition-all text-center"
              >
                View Specs
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 tracking-widest">
            {/* copy right developed by Mustafa */}
            <div className="flex items-center justify-center">
              <a
                target="_blank"
                href="https://mwhmustafa.vercel.app/"
                className="text-sm text-slate-400 font-light hover:text-indigo-500 transition-all"
              >
                Developed by Mustafa
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="w-full lg:w-2/3 flex items-center justify-center relative order-1 lg:order-2 overflow-visible py-0 sm:py-4 lg:-mt-12">
          {/* Ambient Glow */}
          <div className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-indigo-200/30 rounded-full blur-[120px] -z-10 animate-pulse"></div>

          <div
            className={`relative z-20 transition-all duration-700 transform ${
              selectedDevice.category === "laptop"
                ? "scale-[0.38] sm:scale-[0.55] md:scale-[0.75] lg:scale-[0.8] xl:scale-[0.9]"
                : "scale-[0.85] sm:scale-[0.9] md:scale-[1] lg:scale-[0.8] xl:scale-[0.9]"
            }`}
          >
            <DeviceFrame
              ref={mockupRef}
              config={selectedDevice}
              imageUrl={uploadedImage}
              isSafeAreaEnabled={isSafeAreaEnabled}
              zoom={imageZoom}
              theme={deviceTheme}
              isLocked={isImageLocked}
              onReset={() => setImageZoom(1)}
              showStatusBar={showStatusBar}
              showNotch={showNotch}
            />
          </div>
        </div>
      </main>

      {/* Specs Modal */}
      {showSpecs && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {selectedDevice.name}
              </h2>
              <button
                onClick={() => setShowSpecs(false)}
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
                  The {selectedDevice.name} configuration utilizes a
                  titanium-grade chassis mockup with high-fidelity{" "}
                  {selectedDevice.category === "mobile"
                    ? "glass curvature"
                    : "hinge"}{" "}
                  physics.
                </p>
              </div>
              <button
                onClick={() => setShowSpecs(false)}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold transition-all hover:bg-slate-800"
              >
                Close Specifications
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
