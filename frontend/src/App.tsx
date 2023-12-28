import { AppContextProvider } from './context/AppContext';
import CountryCompSubYearlyList from './components/CountryCompSubYearly';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import NavBar from './components/UI/NavBar';
import SideNarBar from './components/UI/SideNarBar';
import { useState } from 'react';

//@ts-ignore
if (!import.meta?.env?.VITE_API_URL) {
  console.error("No VITE_API_URL loaded from env variables")
}


const client = new ApolloClient({
  //@ts-ignore
  uri: `${import.meta.env.VITE_API_URL}`,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

function App() {
  const [ selectedPage, setSelectedPage ] = useState<"yearly" | "list" | "rankings" | "detail" | "conclusion">("yearly")

  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        {/* <NavBar /> */}
        <div className='w-full  pl-0 sm:pl-[200px] xl:pl-[280px] laptop:pl-[340px] pr-2 flex justify-center bg-base-main text-main min-h-screen'>
          <SideNarBar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
          <NavBar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
          <div className='w-full max-w-full pt-14 sm:pt-0 desktop:max-w-[1432px] '>
            <div className="px-5 sm:px-0">
              <CountryCompSubYearlyList />
            </div>
          </div>
        </div>
      </AppContextProvider>
    </ApolloProvider>
  )
}

export default App
