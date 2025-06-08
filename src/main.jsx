import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importiere deine Haupt-App-Komponente
import './index.css'; // Importiere dein globales CSS mit Tailwind-Direktiven

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
