import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AppContextProvider } from './context/AppContext.tsx';

const client = new ApolloClient({
  //@ts-ignore
  uri: `${import.meta.env.VITE_API_URL}`,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
