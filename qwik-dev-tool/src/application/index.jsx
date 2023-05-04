import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './output.css';

const domRoot = createRoot(document.getElementById('root'));
domRoot.render(<App />);
