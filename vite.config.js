import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()]
  // ,
  // server: {
  //   port: 5173,
  //   allowedHosts: [
  //     '1fd8-190-236-133-51.ngrok-free.app'
  //   ]
  // }
})
