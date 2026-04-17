import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/enhanced-globals.css';

import { loginWithToken } from './lib/firebase';

// Disable context menu in production (desktop app feel)
if (import.meta.env.PROD) {
  document.addEventListener('contextmenu', (e) => e.preventDefault());
}

// Handle deep links (for Google OAuth redirect)
if (window.__TAURI_INTERNALS__) {
  import('@tauri-apps/plugin-deep-link').then(({ onOpenUrl }) => {
    onOpenUrl((urls) => {
      console.log('Opened URLs:', urls);
      for (const url of urls) {
        if (url.startsWith('bytebunny://auth')) {
          const parsedUrl = new URL(url.replace('bytebunny://', 'http://'));
          const idToken = parsedUrl.searchParams.get('id_token');
          if (idToken) {
            loginWithToken(idToken).catch(console.error);
          }
        }
      }
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
