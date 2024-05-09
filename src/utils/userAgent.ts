import { headers } from 'next/headers';
import { userAgent } from 'next/server';

export const checkMobile = () =>
  userAgent({ headers: headers() }).device.type === 'mobile';
