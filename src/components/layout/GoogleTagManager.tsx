import { GoogleTagManager } from '@next/third-parties/google';
import { PropsWithChildren } from 'react';

const GoogleTagManger = (props: PropsWithChildren) => {
  return (
    <>
      <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID ?? ''} />
      {props.children}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.GOOGLE_TAG_MANAGER_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
};

export default GoogleTagManger;
