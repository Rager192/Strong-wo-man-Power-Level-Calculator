import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Importiere den Pfad-Modul

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Definiere Aliase für Shadcn/ui-Komponenten
      // Stellt sicher, dass Importe wie '@/components/ui/card' korrekt aufgelöst werden
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
