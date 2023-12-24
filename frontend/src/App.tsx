import React, { useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { AppContextProvider } from './context/AppContext';
import { SelectSubject } from './components/SelectField/SelectSubjectCode';
import CountryCompSubYearlyList from './components/CountryCompSubYearly';

//@ts-ignore
if(!import.meta?.env?.VITE_API_URL){
  console.error("No VITE_API_URL loaded from env variables")
}


const client = new ApolloClient({
  //@ts-ignore
  uri: `${import.meta.env.VITE_API_URL}`,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <div className="pl-20">
          <CountryCompSubYearlyList />
        </div>
      </AppContextProvider>
    </ApolloProvider>
  )
}

export default App
