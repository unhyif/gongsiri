'use client';

import { Device, DeviceContext } from '@context/deviceContext';
import { PropsWithChildren } from 'react';

const DeviceProvider = (props: PropsWithChildren<Device>) => {
  const { children, ...others } = props;
  return (
    <DeviceContext.Provider value={others}>{children}</DeviceContext.Provider>
  );
};

export default DeviceProvider;
