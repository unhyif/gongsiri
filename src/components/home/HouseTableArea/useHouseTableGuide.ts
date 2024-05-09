import { useEffect, useState } from 'react';

export const useHouseTableGuide = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(false);

  const show = () => {
    setIsShown(true);
  };

  const hide = () => {
    setIsShown(false);
    setIsFading(false);
  };

  useEffect(() => {
    if (isShown) {
      setTimeout(() => {
        setIsFading(true);
      }, 2000);
    }
  }, [isShown]);

  return { isShown, isFading, show, hide };
};
