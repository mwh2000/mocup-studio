/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DeviceConfig {
  id: string;
  name: string;
  brand: string;
  category: 'mobile' | 'laptop';
  aspectRatio: number; // width / height
  dimensions: {
    width: number;
    height: number;
  };
  frameStyle: {
    borderRadius: string;
    borderWidth: string;
    bezelColor: string;
    shadow: string;
  };
  screenStyle: {
    borderRadius: string;
    overflow: 'hidden';
  };
  camera: {
    type: 'punch-hole' | 'notch' | 'none';
    position: 'top-center' | 'top-right' | 'top-left';
    size: string;
    color: string;
  };
  safeAreaHeight: number;
  description: string;
}
