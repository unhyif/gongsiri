import { createContext, useContext } from 'react';

export interface Device {
  isMobile: boolean;
}

export const DeviceContext = createContext<Device>({ isMobile: false });

export const useDeviceContext = () => useContext(DeviceContext);
