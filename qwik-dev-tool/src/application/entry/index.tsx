import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// import styles from '../styles/index.css';

const domRoot = createRoot(document.getElementById('root') as HTMLElement);
domRoot.render(<App />);
