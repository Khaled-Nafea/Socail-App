import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource-variable/cairo';
import AuthContextProvider from './Context/AuthContext/AuthContext';
import ProfileContextProvider from './Context/ProfileContext/ProfileContext.jsx';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastContainer/>
      <AuthContextProvider>
        <ProfileContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ProfileContextProvider>
      </AuthContextProvider>
     </HeroUIProvider>
  </StrictMode>,
)
