import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

const root = hydrateRoot(
  document.getElementById('root') as HTMLElement, 
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

