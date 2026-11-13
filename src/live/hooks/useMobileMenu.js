import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DESKTOP_MIN_WIDTH = 992;

export default function useMobileMenu(rootRef) {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((open) => !open), []);

  // Close after navigating to another route.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const root = rootRef.current;
    if (!isOpen || !root) return undefined;

    // ownerDocument and composedPath keep this working in iframes, portals and shadow DOM too.
    const doc = root.ownerDocument;
    const win = doc.defaultView;

    doc.body.classList.add('no-scroll');

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    const onPointerDown = (event) => {
      if (!event.composedPath().includes(root)) setIsOpen(false);
    };
    const onResize = () => {
      if (win.innerWidth >= DESKTOP_MIN_WIDTH) setIsOpen(false);
    };

    doc.addEventListener('keydown', onKeyDown);
    doc.addEventListener('pointerdown', onPointerDown);
    win.addEventListener('resize', onResize);

    return () => {
      doc.body.classList.remove('no-scroll');
      doc.removeEventListener('keydown', onKeyDown);
      doc.removeEventListener('pointerdown', onPointerDown);
      win.removeEventListener('resize', onResize);
    };
  }, [isOpen, rootRef]);

  return { isOpen, toggle, close };
}
