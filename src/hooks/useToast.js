import { useCallback, useEffect, useRef, useState } from 'react';

export function useToast(duration = 2600) {
  const [message, setMessage] = useState('');
  const timer = useRef(null);

  const notify = useCallback(
    (text) => {
      setMessage(text);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setMessage(''), duration);
    },
    [duration]
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return { message, notify };
}
