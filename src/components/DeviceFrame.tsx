import React, { forwardRef, useRef } from "react";
import { motion } from "motion/react";
import Draggable from "react-draggable";
import { DeviceConfig } from "../types";

interface DeviceFrameProps {
  config: DeviceConfig;
  imageUrl: string | null;
  isSafeAreaEnabled: boolean;
  zoom: number;
  theme?: "light" | "dark";
  isLocked?: boolean;
  onReset?: () => void;
}

const Placeholder = ({ theme }: { theme?: "light" | "dark" }) => (
  <div
    className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 ${theme === "light" ? "bg-white" : "bg-[#0a0a0a]"}`}
  >
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${theme === "light" ? "bg-indigo-50 border-indigo-100" : "bg-indigo-500/20 border-indigo-500/30"}`}
    >
      <svg
        className="w-6 h-6 text-indigo-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
    <p
      className={`text-xs font-medium uppercase tracking-widest leading-relaxed ${theme === "light" ? "text-slate-400" : "text-slate-500"}`}
    >
      Upload to preview <br />
      <span className="opacity-50 text-[10px]">High Resolution</span>
    </p>
  </div>
);

const MobileScreen = ({
  config,
  imageUrl,
  isSafeAreaEnabled,
  zoom,
  position,
  handleDrag,
  handleReset,
  handleTouchStart,
  isLocked,
  draggableNodeRef,
  theme,
  currentTime,
}: any) => {
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <>
      <div
        className={`absolute inset-0 z-0 flex items-center justify-center overflow-hidden ${theme === "light" ? "bg-white" : "bg-[#0a0a0a]"}`}
        style={{
          ...config.screenStyle,
          borderRadius: `calc(${config.frameStyle.borderRadius} - 4px)`,
        }}
      >
        {imageUrl ? (
          <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
            <Draggable
              nodeRef={draggableNodeRef}
              position={position}
              onDrag={handleDrag}
              disabled={isLocked}
            >
              <div
                ref={draggableNodeRef}
                className={`absolute ${!isLocked ? "cursor-move z-50 ring-2 ring-indigo-500/30" : ""}`}
                onDoubleClick={handleReset}
                onTouchStart={handleTouchStart}
                style={{
                  paddingTop: isSafeAreaEnabled
                    ? `${config.safeAreaHeight}px`
                    : "0",
                  touchAction: isLocked ? "auto" : "none",
                }}
              >
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="pointer-events-none select-none block transition-transform duration-200 ease-out max-w-none"
                  style={{
                    width: "100%",
                    height: "auto",
                    minHeight: "100%",
                    objectFit: "cover",
                    transform: `scale(${zoom || 1})`,
                  }}
                  crossOrigin={
                    imageUrl?.startsWith("http") ? "anonymous" : undefined
                  }
                />
              </div>
            </Draggable>

            {/* Lock Indicator Overlay */}
            {isLocked && (
              <div
                data-no-export="true"
                className="absolute bottom-4 right-4 z-[100] bg-black/20 backdrop-blur-md p-2 rounded-full border border-white/10 pointer-events-none"
              >
                <svg
                  className="w-3 h-3 text-white/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            )}
          </div>
        ) : (
          <Placeholder theme={theme} />
        )}

        <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-between px-6 z-[60] pointer-events-none">
          <div
            className={`text-[10px] font-bold tracking-tight ${theme === "light" ? "text-slate-900/60" : "text-white/40"}`}
          >
            {formattedTime}
          </div>
          <div
            className={`flex gap-1 items-center ${theme === "light" ? "opacity-60" : "opacity-40"}`}
          >
            <div
              className={`w-3.5 h-1.5 border rounded-[2px] ${theme === "light" ? "border-slate-900" : "border-white"}`}
            />
            <div
              className={`w-1.5 h-1.5 rounded-full ${theme === "light" ? "bg-slate-900" : "bg-white"}`}
            />
          </div>
        </div>

        {config.camera.type === "punch-hole" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#050505] rounded-full z-[70] shadow-inner flex items-center justify-center border border-white/5">
            <div className="w-1 h-1 bg-indigo-900/40 rounded-full blur-[0.5px]"></div>
          </div>
        )}
        {config.camera.type === "notch" && (
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-black z-[70] flex items-center justify-center top-3 rounded-full"
            style={{ width: "75px", height: "20px" }}
          >
            <div className="flex gap-4 items-center">
              <div className="h-1 bg-white/10 rounded-full w-6" />
              <div className="w-1.5 h-1.5 bg-indigo-900/40 rounded-full" />
            </div>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-[inherit] z-40" />
    </>
  );
};

const LaptopScreen = ({
  config,
  imageUrl,
  isSafeAreaEnabled,
  zoom,
  position,
  handleDrag,
  handleReset,
  handleTouchStart,
  isLocked,
  draggableNodeRef,
  theme,
}: any) => {
  return (
    <>
      <div
        className={`absolute inset-0 z-0 flex items-center justify-center overflow-hidden ${theme === "light" ? "bg-white" : "bg-[#0a0a0a]"}`}
        style={{
          ...config.screenStyle,
          borderRadius: `calc(${config.frameStyle.borderRadius} - 4px)`,
        }}
      >
        {imageUrl ? (
          <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
            <Draggable
              nodeRef={draggableNodeRef}
              position={position}
              onDrag={handleDrag}
              disabled={isLocked}
            >
              <div
                ref={draggableNodeRef}
                className={`absolute w-full h-full ${!isLocked ? "cursor-move z-50 ring-2 ring-indigo-500/30" : ""}`}
                onDoubleClick={handleReset}
                onTouchStart={handleTouchStart}
                style={{
                  paddingTop: isSafeAreaEnabled
                    ? `${config.safeAreaHeight}px`
                    : "0",
                  touchAction: isLocked ? "auto" : "none",
                }}
              >
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover pointer-events-none select-none block transition-transform duration-200 ease-out"
                  style={{
                    transform: `scale(${zoom || 1})`,
                  }}
                  crossOrigin={
                    imageUrl?.startsWith("http") ? "anonymous" : undefined
                  }
                />
              </div>
            </Draggable>

            {/* Lock Indicator Overlay */}
            {isLocked && (
              <div
                data-no-export="true"
                className="absolute bottom-4 right-4 z-[100] bg-black/20 backdrop-blur-md p-2 rounded-full border border-white/10 pointer-events-none"
              >
                <svg
                  className="w-3 h-3 text-white/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            )}
          </div>
        ) : (
          <Placeholder theme={theme} />
        )}

        {config.camera.type === "notch" && (
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-black z-[70] flex items-center justify-center top-[-2px] rounded-b-xl"
            style={{ width: "150px", height: "28px" }}
          >
            <div className="flex gap-4 items-center">
              <div className="h-1 bg-white/10 rounded-full w-10" />
              <div className="w-1.5 h-1.5 bg-indigo-900/40 rounded-full" />
            </div>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-[inherit] z-40" />
    </>
  );
};

export const DeviceFrame = forwardRef<HTMLDivElement, DeviceFrameProps>(
  (
    { config, imageUrl, isSafeAreaEnabled, zoom, theme, isLocked, onReset },
    ref,
  ) => {
    const isLaptop = config.category === "laptop";
    const draggableNodeRef = useRef(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000 * 30); // Update every 30 seconds
      return () => clearInterval(timer);
    }, []);

    React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const [lastTap, setLastTap] = React.useState(0);

    const handleReset = () => {
      setPosition({ x: 0, y: 0 });
      onReset?.();
    };

    const handleTouchStart = () => {
      if (!isMobile) return;
      const now = Date.now();
      if (now - lastTap < 300) {
        handleReset();
      }
      setLastTap(now);
    };

    const handleDrag = (_e: any, data: { x: number; y: number }) => {
      setPosition({ x: data.x, y: data.y });
    };

    // On desktop, we always allow dragging (isLocked only applies to mobile)
    const effectivelyLocked = isMobile ? isLocked : false;

    const sharedProps = {
      config,
      imageUrl,
      isSafeAreaEnabled,
      zoom,
      position,
      handleDrag,
      handleReset,
      handleTouchStart,
      isLocked: effectivelyLocked,
      draggableNodeRef,
      theme,
      currentTime,
    };

    return (
      <div
        className={`flex flex-col items-center overflow-visible ${
          isLaptop ? "p-12 sm:p-20" : "p-6 sm:p-16"
        }`}
        ref={ref}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className={`relative p-[4px] bg-[#1a1c1e] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-800/50 ${
            isLaptop ? "origin-bottom" : ""
          }`}
          style={{
            borderRadius: config.frameStyle.borderRadius,
            width: config.dimensions.width,
            height: config.dimensions.height,
          }}
        >
          {/* Physical Buttons (Mobile Only - Single Side Style) */}
          {!isLaptop && (
            <>
              {/* Volume Rocker (Right Side - Long) */}
              <div className="absolute -right-[3px] top-24 w-[3px] h-20 bg-neutral-800 rounded-r-md border-r border-white/10" />
              {/* Power Button (Right Side - Short) */}
              <div className="absolute -right-[3px] top-48 w-[3px] h-12 bg-neutral-800 rounded-r-md border-r border-white/10" />
            </>
          )}

          <div
            className={`w-full h-full relative ${config.frameStyle.bezelColor} overflow-visible`}
            style={{
              borderRadius: `calc(${config.frameStyle.borderRadius} - 4px)`,
            }}
          >
            {isLaptop ? (
              <LaptopScreen {...sharedProps} />
            ) : (
              <MobileScreen {...sharedProps} />
            )}
          </div>
        </motion.div>

        {isLaptop && (
          <div className="relative w-[110%] flex flex-col items-center">
            <div className="w-full h-[12px] bg-gradient-to-b from-[#2a2c30] to-[#1a1c1e] rounded-t-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex justify-center">
              <div className="w-1/4 h-[4px] bg-[#111] mt-1 rounded-sm opacity-50" />
            </div>
            <div className="w-full h-[6px] bg-[#111] rounded-b-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)]" />
          </div>
        )}
      </div>
    );
  },
);
DeviceFrame.displayName = "DeviceFrame";
