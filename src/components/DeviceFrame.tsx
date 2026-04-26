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
  showStatusBar?: boolean;
  showNotch?: boolean;
}

const BrandLogo = ({
  brand,
  theme,
}: {
  brand: string;
  theme?: "light" | "dark";
}) => {
  const isApple = brand.toLowerCase() === "apple";
  const iconColor = theme === "light" ? "text-slate-900" : "text-white";

  if (isApple) {
    return (
      <svg
        className={`w-8 h-8 ${iconColor} opacity-80`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.05 20.28c-.98.95-2.05 1.79-3.48 1.79-1.42 0-1.89-.87-3.51-.87-1.61 0-2.14.85-3.48.87-1.4.02-2.31-.76-3.48-1.92C1.1 18.14 0 14.52 0 11.23c0-5.27 3.32-8.06 6.53-8.06 1.71 0 3.31.7 4.36 1.15 1.05.45 2.11-.11 4.39-.11 2.2 0 4.14 1.18 5.17 2.89-4.32 1.93-3.6 7.64.91 9.48-.8 2.05-1.98 3.51-3.31 4.7zM12.03 3.25C11.95 1.08 13.74 0 13.74 0s.13 2.13-1.71 3.25z" />
      </svg>
    );
  }

  return (
    <div className={`flex flex-col items-center ${iconColor} opacity-80`}>
      <span className="text-sm font-black tracking-tighter leading-none">
        SAMSUNG
      </span>
    </div>
  );
};

// نمرر الـ config هنا لنعرف البراند
const Placeholder = ({
  config,
  theme,
}: {
  config: DeviceConfig;
  theme?: "light" | "dark";
}) => (
  <div
    className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 ${
      theme === "light" ? "bg-white" : "bg-[#0a0a0a]"
    }`}
  >
    <div
      className={`flex items-center justify-center mb-6 transition-colors duration-500`}
    >
      {/* استدعاء مكون اللوجو بناءً على البراند */}
      <BrandLogo brand={config.brand} theme={theme} />
    </div>

    <p
      className={`text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed ${
        theme === "light" ? "text-slate-400" : "text-slate-500"
      }`}
    >
      {config.name} <br />
      <span className="opacity-40 font-light mt-1 block">
        Upload to preview
      </span>
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
  showStatusBar = true,
  showNotch = true,
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
                className={`absolute ${!isLocked ? "cursor-move z-50" : ""}`}
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
          <Placeholder config={config} theme={theme} />
        )}

        {/* Status Bar */}
        {showStatusBar && (
          <div
            className={`absolute top-0 left-0 right-0 ${config.camera.type === "notch" ? "h-[44px]" : "h-[36px]"} flex items-center justify-between px-6 z-[60] pointer-events-none`}
          >
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
        )}

        {showNotch && config.camera.type === "punch-hole" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#050505] rounded-full z-[70] shadow-inner flex items-center justify-center border border-white/5">
            <div className="w-1 h-1 bg-indigo-900/40 rounded-full blur-[0.5px]"></div>
          </div>
        )}
        {showNotch && config.camera.type === "notch" && (
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

        {/* Home Indicator */}
        {showStatusBar && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1.5 z-[60] pointer-events-none">
            <div
              className={`w-full h-full rounded-full ${theme === "light" ? "bg-slate-900/30" : "bg-white/30"} backdrop-blur-sm`}
            />
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
                className={`absolute w-full h-full ${!isLocked ? "cursor-move z-50" : ""}`}
                onDoubleClick={handleReset}
                onTouchStart={handleTouchStart}
                style={{
                  paddingTop: isSafeAreaEnabled
                    ? `${config.safeAreaHeight}px`
                    : "0",
                  touchAction: isLocked ? "auto" : "none",
                  height: "fill",
                  width: "fill",
                }}
              >
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="h-full object-cover m-auto pointer-events-none select-none block transition-transform duration-200 ease-out"
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
          <Placeholder config={config} theme={theme} />
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
    {
      config,
      imageUrl,
      isSafeAreaEnabled,
      zoom,
      theme,
      isLocked,
      onReset,
      showStatusBar = true,
      showNotch = true,
    },
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
      showStatusBar,
      showNotch,
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
          className={`relative p-[4px] bg-[#1a1c1e] border border-slate-800/50 ${
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
            <div className="w-full h-[6px] bg-[#111] rounded-b-xl" />
          </div>
        )}
      </div>
    );
  },
);
DeviceFrame.displayName = "DeviceFrame";
