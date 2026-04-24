/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DeviceConfig } from '../types';

export const DEVICES: Record<string, DeviceConfig> = {
  s26_ultra: {
    id: 's26_ultra',
    name: 'Galaxy S26 Ultra',
    brand: 'Samsung',
    category: 'mobile',
    aspectRatio: 19.5 / 9,
    dimensions: {
      width: 320,
      height: 693,
    },
    frameStyle: {
      borderRadius: '24px',
      borderWidth: '12px',
      bezelColor: 'bg-neutral-900',
      shadow: 'shadow-2xl shadow-black/50',
    },
    screenStyle: {
      borderRadius: '14px',
      overflow: 'hidden',
    },
    camera: {
      type: 'punch-hole',
      position: 'top-center',
      size: '10px',
      color: 'bg-black',
    },
    safeAreaHeight: 32,
  },
  iphone_16_pro: {
    id: 'iphone_16_pro',
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    category: 'mobile',
    aspectRatio: 19.5 / 9,
    dimensions: {
      width: 320,
      height: 693,
    },
    frameStyle: {
      borderRadius: '48px',
      borderWidth: '10px',
      bezelColor: 'bg-zinc-800',
      shadow: 'shadow-2xl shadow-black/40',
    },
    screenStyle: {
      borderRadius: '40px',
      overflow: 'hidden',
    },
    camera: {
      type: 'notch',
      position: 'top-center',
      size: '24px',
      color: 'bg-black',
    },
    safeAreaHeight: 44,
  },
  macbook_pro_16: {
    id: 'macbook_pro_16',
    name: 'MacBook Pro 16"',
    brand: 'Apple',
    category: 'laptop',
    aspectRatio: 16 / 10,
    dimensions: {
      width: 800,
      height: 520,
    },
    frameStyle: {
      borderRadius: '16px',
      borderWidth: '16px',
      bezelColor: 'bg-zinc-900',
      shadow: 'shadow-2xl shadow-black/60',
    },
    screenStyle: {
      borderRadius: '8px',
      overflow: 'hidden',
    },
    camera: {
      type: 'notch',
      position: 'top-center',
      size: '24px',
      color: 'bg-black',
    },
    safeAreaHeight: 32,
  }
};
