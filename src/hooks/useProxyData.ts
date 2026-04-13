'use client';
import { useState, useEffect } from 'react';
import { MOCK_PAYMENTS, MOCK_SERVICES } from '@/lib/mockData';

export function useProxyData() {
  const [payments, setPayments] = useState(MOCK_PAYMENTS);
  const [services, setServices] = useState(MOCK_SERVICES);
  const [proxyOnline, setProxyOnline] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Health Check
        const healthRes = await fetch('http://localhost:4021/health', {
          signal: AbortSignal.timeout(2000)
        });
        
        if (healthRes.ok) {
          setProxyOnline(true);
          
          // Step 2: Fetch REAL Data from Proxy
          const [payRes, svcRes] = await Promise.all([
            fetch('http://localhost:4021/api/payments'),
            fetch('http://localhost:4021/api/proxies')
          ]);

          if (payRes.ok) {
            const payData = await payRes.json();
            // Merge real payments on top of mock for a "Fuller" feed
            if (payData.payments && payData.payments.length > 0) {
              setPayments([...payData.payments, ...MOCK_PAYMENTS].slice(0, 10));
            }
          }

          if (svcRes.ok) {
            const svcData = await svcRes.json();
            if (svcData.proxies && svcData.proxies.length > 0) {
              setServices(svcData.proxies);
            }
          }
        } else {
          setProxyOnline(false);
          setPayments(MOCK_PAYMENTS);
          setServices(MOCK_SERVICES);
        }
      } catch (err) {
        setProxyOnline(false);
        setPayments(MOCK_PAYMENTS);
        setServices(MOCK_SERVICES);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Poll every 10s for snappy HUD
    return () => clearInterval(interval);
  }, []);

  return { payments, services, proxyOnline };
}
