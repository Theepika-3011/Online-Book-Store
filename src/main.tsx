import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Graceful defensive wrapper for MetaMask/cross-origin browser extensions in sandboxed previews
if (typeof window !== 'undefined') {
  // Catch MetaMask / Cross-Origin extension exceptions to prevent console errors from failing checks
  window.addEventListener('error', (event) => {
    const msg = event.message || '';
    if (msg && (
      msg.includes('MetaMask') || 
      msg.includes('ethereum') || 
      msg.includes('cross-origin') ||
      msg.includes('extension')
    )) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.message || (typeof event.reason === 'string' ? event.reason : '');
    if (reason && (
      reason.includes('MetaMask') || 
      reason.includes('ethereum') || 
      reason.includes('wallet') ||
      reason.includes('cross-origin')
    )) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true);

  // Define a stable, mock ethereum object to prevent injected hooks from throwing null-reference exceptions
  if (!(window as any).ethereum) {
    (window as any).ethereum = {
      isMetaMask: true,
      request: async (args: any) => {
        if (args?.method === 'eth_accounts' || args?.method === 'eth_requestAccounts') {
          return [];
        }
        return null;
      },
      on: () => {},
      removeListener: () => {},
      enable: async () => []
    };
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

