import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { ICountriesInfo } from '../../types'

export const SelectCountry = ({ selectedCountry, setSelectedCountry }: {
  selectedCountry: ICountriesInfo | null
  setSelectedCountry: React.Dispatch<React.SetStateAction<ICountriesInfo | null>>
}) => {

  const [toggle, setToggle] = useState<boolean>(false)
  
  const [searchInput, setSearchInput] = useState<string>('')
  const AllCountries = useContext(AppContext).fieldsState?.countries
  const [countries, setCountries] = useState<(ICountriesInfo | undefined)[]>(AllCountries?AllCountries:[])

  const parentEle = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{
    const handleClickEvent =  (event: Event)=>{
      // console.log("Clicked", event.target, parentEle.current?.contains(event.target as Node))
      if(parentEle.current && event.target &&   !parentEle.current.contains(event.target as Node)) {
        setToggle(false)
        // console.log("toggle false")
      }   
    }
    document.addEventListener('click', handleClickEvent)

    return ()=>{
      document.removeEventListener('click', handleClickEvent)
    }
  }, [parentEle])

  useEffect(()=>{
    if(AllCountries && searchInput.length > 0){
      const new_countries = AllCountries.map((country)=>{ 
        if(country && searchInput === country.name.slice(0, searchInput.length)){
          return country 
        } else {
          return undefined
        }
      }) 
      
      setCountries(new_countries)
    } else {
      setCountries(AllCountries?AllCountries:[])
    }
  },[AllCountries, searchInput])


  if (!AllCountries) {
    return <div></div>
  }

  return (
    <div className='relative text-sm md:text-base'>
      <div ref={parentEle} className='w-40 xl:w-48 text-sm xl:text-base'>
        <button 
          className='bg-dark-secondary-2 text-base-main flex items-center space-x-2 w-full justify-center font-semibold py-2 rounded-lg' 
          onClick={() => { 
            // console.log("!!! Clikced")
            setToggle(prev => !prev) 
          }}>
          <span>{selectedCountry ? (selectedCountry.name.length < 16?selectedCountry.name:selectedCountry.name.slice(0,14) + '..') : 'Select a Country'}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className={`w-5 xl:w-6 aspect-square ${!toggle?'-rotate-180':'rotate-0'} transition-all duration-500`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        <div className={`${toggle ? 'block' : 'hidden'} bg-light-secondary-0  absolute z-50 top-14 -left-4 w-56 border shadow-md`}>
          <input 
            value={searchInput}
            onChange={(e)=>{setSearchInput(e.target.value)}}
            className='sticky top-0 w-40 md:w-48 px-2 py-1.5 mx-4 my-3 text-main border' placeholder='Enter to find' />
          <div className='max-h-96 relative overflow-y-auto mx-auto max-w-full'>
            <ul className={`flex flex-col`}>
              {
                countries.map((country, index) => {
                  if(!country){
                    return <li key={index}></li>
                  }
                  return <li key={country?country.iso:index} className='hover:bg-light-secondary-2'>
                    <button 
                      className='px-3 py-2 w-full text-left'
                      onClick={()=>{
                        setSelectedCountry(country)
                        setToggle(false)
                        setSearchInput('')
                      }}
                      >{country.name}</button>
                  </li>
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
