/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Layout, Palette, ArrowRight, Download, Laptop, ShieldCheck } from 'lucide-react';
import { toPng } from 'html-to-image';
import { DeviceFrame } from './components/DeviceFrame';
import { ImageUploader } from './components/ImageUploader';
import { DEVICES } from './constants/devices';

export default function App() {
  const [selectedDevice, setSelectedDevice] = useState(DEVICES.s26_ultra);
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'
  );
  const [isSafeAreaEnabled, setIsSafeAreaEnabled] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const mockupRef = useRef<HTMLDivElement>(null);

  const handleDeviceChange = (deviceId: string) => {
    setSelectedDevice(DEVICES[deviceId]);
  };

  const handleDownload = useCallback(async () => {
    if (mockupRef.current === null) return;

    try {
      // First, ensure all images in the mockup are loaded and have crossOrigin="anonymous" 
      // already set in the component. We use toPng with specific options for better compatibility.
      const dataUrl = await toPng(mockupRef.current, {
        cacheBust: true,
        backgroundColor: '#f8fafc', // match slate-50
        pixelRatio: 2,
        style: {
          transform: 'scale(1)',
          margin: '0',
        },
      });
      
      const link = document.createElement('a');
      link.download = `mockup_${selectedDevice.id}_${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to export image:', err);
      alert('Unable to export image. This might be due to security restrictions in your browser or an external image failing to load.');
    }
  }, [selectedDevice.id]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-600 selection:text-white flex flex-col">
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Mockup Studio</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          <a href="#" className="hover:text-slate-900 transition-colors">Showcase</a>
          <button onClick={() => setShowSpecs(true)} className="hover:text-slate-900 transition-colors cursor-pointer">Specs</button>
        </div>
        <button className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2">
          New Project
        </button>
      </nav>

      <main className="flex-1 relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-center py-8 md:py-12 px-6 gap-12 lg:gap-16">
        {/* Left Column: Controls */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8 md:gap-10 order-2 lg:order-1">
          <header>
            <h1 className="text-3xl font-light text-slate-900">Device Frame <span className="font-semibold">Configurator</span></h1>
            <p className="text-slate-500 text-sm mt-4 leading-relaxed font-medium">
              Create high-fidelity previews of your mobile interfaces using our modular device wrapper system. Drag the screen content to align perfectly.
            </p>
          </header>

          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Smartphone className="w-3 h-3" /> Active Profile
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.values(DEVICES).map((device) => (
                  <button
                    key={device.id}
                    onClick={() => handleDeviceChange(device.id)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                      selectedDevice.id === device.id
                        ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                        : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {device.category === 'laptop' ? <Laptop className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                    {device.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Features</label>
              </div>
              <button
                onClick={() => setIsSafeAreaEnabled(!isSafeAreaEnabled)}
                className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${
                  isSafeAreaEnabled 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className={`w-5 h-5 ${isSafeAreaEnabled ? 'text-indigo-500' : 'text-slate-300'}`} />
                  <div className="text-left">
                    <p className="text-sm font-semibold">Safe Area</p>
                    <p className="text-[10px] opacity-70 font-medium">Auto-pad content below notch</p>
                  </div>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${isSafeAreaEnabled ? 'bg-indigo-500' : 'bg-slate-200'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${isSafeAreaEnabled ? 'left-5.5' : 'left-0.5'}`} />
                </div>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Content Upload</label>
              <ImageUploader 
                onImageUpload={setUploadedImage} 
                currentImage={uploadedImage}
                onClear={() => setUploadedImage(null)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <button 
                onClick={handleDownload}
                disabled={!uploadedImage}
                className="px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 text-center flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" /> Download Mockup
              </button>
              <button 
                onClick={() => setShowSpecs(true)}
                className="px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold shadow-sm hover:bg-slate-50 transition-all text-center"
              >
                View Specs
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 hidden sm:block">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-lg font-bold text-slate-800">120Hz</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Display</div>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-800">{selectedDevice.category === 'laptop' ? '16"' : '6.8"'}</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Canvas</div>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-800">Titanium</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Chassis</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="w-full lg:w-2/3 flex items-center justify-center relative order-1 lg:order-2 overflow-visible py-4 sm:py-8">
          {/* Ambient Glow */}
          <div className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-indigo-200/30 rounded-full blur-[120px] -z-10 animate-pulse"></div>
          
          <div className="relative z-20 transition-all duration-700 transform scale-[0.6] sm:scale-[0.8] md:scale-[1] lg:scale-[0.9] xl:scale-[1]">
            <DeviceFrame 
              ref={mockupRef}
              config={selectedDevice}
              imageUrl={uploadedImage}
              isSafeAreaEnabled={isSafeAreaEnabled}
            />
          </div>

          {/* Shadow Reflection */}
          <div className="absolute bottom-4 sm:bottom-0 w-1/2 h-8 bg-slate-900/5 blur-3xl opacity-50"></div>
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
              <h2 className="text-xl font-bold text-slate-900">{selectedDevice.name}</h2>
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
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Manufacturer</p>
                  <p className="text-sm font-semibold text-slate-700">{selectedDevice.brand}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Form Factor</p>
                  <p className="text-sm font-semibold text-slate-700 capitalize">{selectedDevice.category}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Canvas Width</p>
                  <p className="text-sm font-semibold text-slate-700">{selectedDevice.dimensions.width}px</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Canvas Height</p>
                  <p className="text-sm font-semibold text-slate-700">{selectedDevice.dimensions.height}px</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                 <p className="text-xs text-slate-500 leading-relaxed italic">
                    The {selectedDevice.name} configuration utilizes a titanium-grade chassis mockup with high-fidelity {selectedDevice.category === 'mobile' ? 'glass curvature' : 'hinge' } physics.
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
