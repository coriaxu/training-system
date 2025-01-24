'use client';

import { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

export function showToastMessage(message: string) {
  const toastEvent = new CustomEvent('showToast', { detail: message });
  window.dispatchEvent(toastEvent);
}

export default function Toast({ message, duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg">
        {message}
      </div>
    </div>
  );
}