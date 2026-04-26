/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import {
  Smartphone,
  ArrowRight,
  Download,
  Github,
  Settings,
  Laptop,
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import { toPng } from "html-to-image";
import { DeviceFrame } from "./components/DeviceFrame";
import { ImageUploader } from "./components/ImageUploader";
import { ConfirmModal } from "./components/ConfirmModal";
import { SpecsModal } from "./components/SpecsModal";
import { SettingsPopover } from "./components/SettingsPopover";
import { DEVICES } from "./constants/devices";

export default function App() {
  const [selectedDevice, setSelectedDevice] = useState(DEVICES.s26_ultra);
  // const [uploadedImage, setUploadedImage] = useState<string | null>(
  //   "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  // );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSafeAreaEnabled, setIsSafeAreaEnabled] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [showConfirmNew, setShowConfirmNew] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);
  const [deviceTheme, setDeviceTheme] = useState<"light" | "dark">("light");
  const [isImageLocked, setIsImageLocked] = useState(true);
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showNotch, setShowNotch] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) < 10) return;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down
        setShowNav(false);
      } else {
        // scrolling up
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
    if (uploadedImage) {
      setShowConfirmNew(true);
    } else {
      resetProject();
    }
  };

  const resetProject = () => {
    setSelectedDevice(DEVICES.s26_ultra);
    setUploadedImage(null);
    setImageZoom(1);
    setIsSafeAreaEnabled(false);
    setDeviceTheme("light");
    setShowConfirmNew(false);
  };

  const handleResetAll = () => {
    setIsSafeAreaEnabled(false);
    setDeviceTheme("light");
    setShowStatusBar(true);
    setShowNotch(true);
    setImageZoom(1);
    setIsImageLocked(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-600 selection:text-white flex flex-col overflow-x-hidden">
      <nav
        className={`fixed top-6 left-0 right-0 z-50 transition-all duration-300 ${
          showNav ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 md:px-16 lg:px-24">
          <div className="backdrop-blur-xl bg-white/60 border border-white/30 rounded-2xl px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              {/* Left */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>

                <div className="flex flex-col leading-none">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                    Mockup Studio
                  </span>
                  <span className="text-[8px] font-light text-slate-400/80 tracking-widest">
                    by Mustafa
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3 md:gap-4">
                <a
                  target="_blank"
                  href="https://github.com/mwh2000/mocup-studio"
                  className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>

                <button
                  onClick={handleNewProject}
                  className="px-4 md:px-5 py-2 bg-slate-900/90 backdrop-blur rounded-xl text-white text-xs font-semibold hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2"
                >
                  New Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-center pt-10 md:pt-24 pb-8 px-8 md:px-16 lg:px-32 gap-4 lg:gap-24">
        {" "}
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
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
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

                <SettingsPopover
                  isOpen={showSettings}
                  onClose={() => setShowSettings(false)}
                  deviceTheme={deviceTheme}
                  setDeviceTheme={setDeviceTheme}
                  isSafeAreaEnabled={isSafeAreaEnabled}
                  setIsSafeAreaEnabled={setIsSafeAreaEnabled}
                  showStatusBar={showStatusBar}
                  setShowStatusBar={setShowStatusBar}
                  showNotch={showNotch}
                  setShowNotch={setShowNotch}
                  isImageLocked={isImageLocked}
                  setIsImageLocked={setIsImageLocked}
                  imageZoom={imageZoom}
                  setImageZoom={setImageZoom}
                  uploadedImage={uploadedImage}
                  handleResetAll={handleResetAll}
                />
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
            <div className="flex items-center justify-center">
              <a
                target="_blank"
                href="https://mwhmustafa.vercel.app/"
                className="group text-sm text-slate-400 font-light transition-colors duration-300 hover:text-[#0d9488]"
              >
                Developed by{" "}
                <span
                  style={{ fontFamily: "'Babylonica'" }}
                  className="text-xl font-bold text-[#0d9488] sm:text-slate-400 transition-colors duration-300 group-hover:text-[#0d9488]"
                >
                  Mustafa
                </span>
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

      <ConfirmModal
        isOpen={showConfirmNew}
        onClose={() => setShowConfirmNew(false)}
        onConfirm={resetProject}
      />

      <SpecsModal
        isOpen={showSpecs}
        onClose={() => setShowSpecs(false)}
        selectedDevice={selectedDevice}
      />
    </div>
  );
}
