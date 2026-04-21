import { useSyncExternalStore } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';

export function useIsMobile() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mql = window.matchMedia(MOBILE_QUERY);
      mql.addEventListener('change', onStoreChange);
      return () => mql.removeEventListener('change', onStoreChange);
    },
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  );
}
