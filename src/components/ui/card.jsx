import React from 'react';

export default function Card({ children, className }) {
  try {
    return (
      <div
        className={`bg-white shadow-md rounded-md p-4 border border-gray-200 ${className || ''}`}
        style={{ maxWidth: '400px', margin: 'auto' }}
      >
        {React.Children.count(children) > 0 ? children : <p>Keine Inhalte übergeben</p>}
      </div>
    );
  } catch (error) {
    console.error("Card-Komponente fehlgeschlagen:", error);
    return <div>Fehler in der Card-Komponente</div>;
  }
}
