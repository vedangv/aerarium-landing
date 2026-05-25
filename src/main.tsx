import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Analytics} from '@vercel/analytics/react';
import App from './App.tsx';
import AdminWaitlist from './components/AdminWaitlist.tsx';
import './index.css';

const RootComponent = window.location.pathname === "/admin/waitlist" ? AdminWaitlist : App;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootComponent />
    <Analytics />
  </StrictMode>,
);
