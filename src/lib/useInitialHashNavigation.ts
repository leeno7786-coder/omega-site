import { useEffect } from 'react';

// Cross-document fragments can be resolved before a client-rendered page mounts.
export default function useInitialHashNavigation() {
  useEffect(() => {
    const fragment = window.location.hash.slice(1);
    if (!fragment) return;

    let id: string;
    try {
      id = decodeURIComponent(fragment);
    } catch {
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, []);
}
