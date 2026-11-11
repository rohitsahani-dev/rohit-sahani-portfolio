import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure /assets/... images resolve on GitHub Pages whether served from root, subpath, or raw branch (/public/assets/...)
if (typeof window !== 'undefined') {
  window.addEventListener(
    'error',
    (event) => {
      const target = event.target;
      if (target instanceof HTMLImageElement) {
        const rawSrc = target.getAttribute('src') || '';
        const step = target.dataset.fallbackStep || '0';
        if (rawSrc.startsWith('/assets/') && step === '0') {
          target.dataset.fallbackStep = '1';
          target.src = `.${rawSrc}`;
        } else if ((rawSrc.startsWith('./assets/') || rawSrc.startsWith('/assets/')) && step === '1') {
          target.dataset.fallbackStep = '2';
          const clean = rawSrc.replace(/^\.?\//, '');
          target.src = `./public/${clean}`;
        }
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(<App />);
