/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DeviceConfig } from "../types";

export const DEVICES: Record<string, DeviceConfig> = {
  s26_ultra: {
    id: "s26_ultra",
    name: "Galaxy S26 Ultra",
    brand: "Samsung",
    category: "mobile",
    aspectRatio: 19.5 / 9,
    dimensions: {
      width: 320,
      height: 693,
    },
    frameStyle: {
      borderRadius: "16px",
      borderWidth: "12px",
      bezelColor: "bg-neutral-900",
      shadow: "shadow-2xl shadow-black/50",
    },
    screenStyle: {
      borderRadius: "14px",
      overflow: "hidden",
    },
    camera: {
      type: "punch-hole",
      position: "top-center",
      size: "10px",
      color: "bg-black",
    },
    safeAreaHeight: 52,
    description:
      "Galaxy S26 Ultra configuration utilizes a titanium-reinforced chassis with a flat LTPO AMOLED display technology and advanced anti-reflective glass physics.",
  },
  iphone_17_pro_max: {
    id: "iphone_17_pro_max",
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    category: "mobile",
    aspectRatio: 19.5 / 9,
    dimensions: {
      width: 320,
      height: 693,
    },
    frameStyle: {
      borderRadius: "48px",
      borderWidth: "10px",
      bezelColor: "bg-zinc-800",
      shadow: "shadow-2xl shadow-black/40",
    },
    screenStyle: {
      borderRadius: "40px",
      overflow: "hidden",
    },
    camera: {
      type: "notch",
      position: "top-center",
      size: "24px",
      color: "bg-black",
    },
    safeAreaHeight: 64,
    description:
      "iPhone 17 Pro Max features a Grade 5 titanium frame with refined Dynamic Island integration optimized for high-fidelity content rendering.",
  },
  macbook_pro_16: {
    id: "macbook_pro_16",
    name: "MacBook Pro 16",
    brand: "Apple",
    category: "laptop",
    aspectRatio: 16 / 10,
    dimensions: {
      width: 800,
      height: 520,
    },
    frameStyle: {
      borderRadius: "16px",
      borderWidth: "16px",
      bezelColor: "bg-zinc-900",
      shadow: "shadow-2xl shadow-black/60",
    },
    screenStyle: {
      borderRadius: "8px",
      overflow: "hidden",
    },
    camera: {
      type: "notch",
      position: "top-center",
      size: "24px",
      color: "bg-black",
    },
    safeAreaHeight: 48,
    description:
      "MacBook Pro 16 features an aerospace-grade aluminum frame with precision-engineered bezel metrics optimized for high-fidelity professional workflows.",
  },
};
