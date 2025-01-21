import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./App.css"
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { AuthContextProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Provider >
)
