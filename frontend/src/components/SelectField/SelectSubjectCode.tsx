import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { ISubjectsInfo } from '../../types'

export const SelectSubject = ({ setSelected, selected }: {
  selected: ISubjectsInfo | null
  setSelected: React.Dispatch<React.SetStateAction<ISubjectsInfo | null>>
}) => {
  const [toggle, setToggle] = useState<boolean>(false)
  

  const parentEle = useRef<HTMLDivElement | null>(null)
  const AllSubjects = useContext(AppContext).fieldsState?.subjects

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

  // useEffect(()=>{
  //   if(selected){
  //     setSubject(selected.code)
  //   }
  // }, [selected])

  if (!AllSubjects) {
    return <div></div>
  }

  return (
    <div className='relative'>
      <div ref={parentEle} className='text-sm xl:text-base'>
        <button 
          className='bg-dark-secondary-2 text-base-main items-center space-x-2 flex  justify-center font-semibold py-2 px-3 rounded-lg' 
          onClick={() => { 
            // console.log("!!! Clikced")
            setToggle(prev => !prev) 
          }}>
          <span>{selected ? (selected.name.length < 24?selected.name:selected.name.slice(0,22) + '..') : 'Select a Subject'}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className={`w-6 h-6 ${!toggle?'-rotate-180':'rotate-0'} transition-all duration-500`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        <div className={`${toggle ? 'block' : 'hidden'} absolute z-50 top-14 left-0 w-56 border shadow-md`}>
          <div className='max-h-96 relative overflow-y-auto mx-auto max-w-full'>
  
            <ul className={`flex flex-col`}>
              {
                AllSubjects.map((subjects, index) => {
                  if(!subjects){
                    return <li key={index}></li>
                  }
                  return <li key={subjects?subjects.code:index} className='bg-light-secondary-0 hover:bg-light-secondary-2'>
                    <button 
                      className='px-3 py-2 w-full text-left'
                      onClick={()=>{
                        // console.log("check this subject!", subjects)
                        setSelected(subjects)
                        setToggle(false)
                      }}
                      >{subjects.name}</button>
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