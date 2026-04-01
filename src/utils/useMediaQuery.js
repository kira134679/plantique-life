import { useSyncExternalStore } from 'react';

export default function useMediaQuery(query) {
  const media = window.matchMedia(query);

  const subscribe = callback => {
    media.addEventListener('change', callback);

    return () => {
      media.removeEventListener('change', callback);
    };
  };

  const getSnapshot = () => media.matches;

  return useSyncExternalStore(subscribe, getSnapshot);
}
