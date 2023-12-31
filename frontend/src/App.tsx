import NavBar from './components/UI/NavBar';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from './context/AppContext';
import SideNarBar from './components/UI/SideNarBar';
import CountryCompSubYearlyList from './components/CountryCompSubYearly';
import UnderConstruction from './components/UI/UnderConstruction';

//@ts-ignore
if (!import.meta?.env?.VITE_API_URL) {
  console.error("No VITE_API_URL loaded from env variables")
}

function App() {
  const { gErrors, setGErrors } = useContext(AppContext)
  const [selectedPage, setSelectedPage] = useState<"yearly" | "list" | "rankings" | "detail" | "conclusion">("yearly")
  const { loading: initialAppLoading, error: AppFieldsLoadingError } = useContext(AppContext).fields

  useEffect(() => {
    if (AppFieldsLoadingError) {
      console.error("While loading the fields(All countries and subjects data)", AppFieldsLoadingError)
      setGErrors((prev) => {
        const arr = prev.slice()
        return ['Error occured while getting the fields data, refresh the page or try again later.'].concat(arr)
      })
    }
  }, [AppFieldsLoadingError])

  return (
    <>
      {
        gErrors.length > 0 &&
        <div className='fixed pl-2 sm:pl-[200px] xl:pl-[280px] laptop:pl-[340px]  pt-14 sm:pt-0 z-50  w-full flex flex-col items-center pr-2'>
          <div className='w-full max-w-full lg:max-w-5xl mx-auto'>
            {
              gErrors.map((error, index) => {
                return (
                  <div className="flex  items-center p-4 mt-4 border border-red-300 w-full text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <div className="ms-3 text-sm font-medium">
                      {error}
                    </div>
                    <button
                      onClick={() => {
                        setGErrors((prev => {
                          if (index === 0) {
                            return prev.slice(1)
                          }
                          return prev.slice(0, index).concat(prev.slice(index + 1))
                        }))
                      }}
                      type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
                      <span className="sr-only">Close</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                    </button>
                  </div>
                )

                return <div className='flex bg-red-200 text-red-700 justify-between items-center max-w-3xl p-2' >
                  <span>{error}</span>
                  <button onClick={
                    () => {
                      setGErrors((prev => {
                        if (index === 0) {
                          return prev.slice(1)
                        }
                        return prev.slice(0, index).concat(prev.slice(index + 1))
                      }))
                    }}>
                    X
                  </button>
                </div>
              })
            }
          </div>
        </div>
      }
      <div className='w-full pl-0 sm:pl-[200px] xl:pl-[280px] laptop:pl-[340px]  pr-2 flex justify-center bg-base-main text-main min-h-screen'>

        <SideNarBar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
        <NavBar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
        <div className='w-full min-h-screen max-w-full pt-14 sm:pt-0 desktop:max-w-[1432px] '>
          {
            initialAppLoading &&
            <div role="status" className='w-full h-full flex items-center justify-center'>
              <svg aria-hidden="true" className="w-20 aspect-square text-light-secondary-1 animate-spin fill-[--dark-secondary-3]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          }
          {
            !initialAppLoading &&
            <div className="px-5 sm:px-0">
              {
                selectedPage === "yearly" &&
                <CountryCompSubYearlyList />
              }
              {
                selectedPage !== "yearly" &&
                <UnderConstruction />
              }
            </div>
          }
        </div>
      </div >
    </>
  )
}

export default App
