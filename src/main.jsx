import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { CountryProvider } from './country/context/country/CountryProvider.jsx'

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CountryProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CountryProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
