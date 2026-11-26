'use client';

import { useEffect, useState } from 'react';
import { paymentSocketUrl } from '@/lib/karena';

export type PaymentStatus = 'Pending' | 'Completed' | 'Failed';

/** M-Pesa prompts are worth waiting about two minutes for. */
const GIVE_UP_AFTER_MS = 120_000;

/**
 * Follows a payment by its reference over the API's WebSocket. It reports
 * Completed or Failed when the API says so, and Failed if nothing is heard in
 * two minutes (the prompt has timed out by then).
 */
export function usePaymentStatus(reference: string): PaymentStatus {
  const [status, setStatus] = useState<PaymentStatus>('Pending');

  useEffect(() => {
    const url = paymentSocketUrl(reference);
    if (!url) {
      const t = setTimeout(() => setStatus('Failed'), 0);
      return () => clearTimeout(t);
    }

    let settled = false;
    const socket = new WebSocket(url);
    const timer = setTimeout(() => finish('Failed'), GIVE_UP_AFTER_MS);
    function finish(next: PaymentStatus) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      setStatus(next);
      socket.close();
    }

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(String(event.data));
        if (data?.status === 'Completed') finish('Completed');
        else if (data?.status === 'Failed') finish('Failed');
      } catch {
        // not a status message: keep waiting
      }
    };
    socket.onerror = () => finish('Failed');

    return () => {
      settled = true;
      clearTimeout(timer);
      socket.close();
    };
  }, [reference]);

  return status;
}
