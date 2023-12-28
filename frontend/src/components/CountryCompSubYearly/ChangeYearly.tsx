import React from 'react'

export default function ChangeYearly({ years, setYears }: {
  years: {
    start: number;
    end: number;
  },
  setYears: React.Dispatch<React.SetStateAction<{
    start: number;
    end: number;
  }>>

}) {

  return (
    <div className='flex justify-between'>
      <div className="relative flex items-center max-w-[8rem]">
        <button
          onClick={() => { setYears((prev) => { return { ...prev, start: (prev.start > 2002) ? prev.start - 1 : prev.start } }) }}
          type="button"
          className="bg-light-secondary-1 hover:bg-light-secondary-3 border border-secondary-3 rounded-s-lg p-1.5 md:p-3 w-9 aspect-[9/11] focus:ring-secondary-1 focus:ring-2 focus:outline-none">
          <svg className="w-2.5 md:w-3 aspect-square text-main" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M1 1h16" />
          </svg>
        </button>
        <input
          value={years.start}
          onChange={(event) => {
            const val = parseInt(event.target.value)
            setYears((prev) => { return { ...prev, start: (val > 2001 && val < 2027) ? val : prev.start } })
          }}
          type="text" className="bg-light-secondary-0 border-x-0 border-secondary-4 h-[32.75px] md:h-11 text-center text-main text-sm focus:ring-secondary-5 focus:border-secondary-5 block w-full py-2.5 " placeholder="2015" required />
        <button
          onClick={() => { setYears((prev) => { return { ...prev, start: (prev.start < 2027) ? prev.start + 1 : prev.start } }) }}
          type="button"
          id="increment-button"
          className="bg-light-secondary-1 hover:bg-light-secondary-3 border border-secondary-3 rounded-e-lg p-1.5 md:p-3 w-9 aspect-[9/11] focus:ring-secondary-1 focus:ring-2 focus:outline-none">
          <svg className="w-2.5 md:w-3 aspect-square text-main" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M9 1v16M1 9h16" />
          </svg>
        </button>
      </div>
      <div className="relative flex items-center max-w-[8rem]">
        <button
          onClick={() => { setYears((prev) => { return { ...prev, end: (prev.end > 2003) ? prev.end - 1 : prev.end } }) }}
          type="button"
          className="bg-light-secondary-1 hover:bg-light-secondary-3 border border-secondary-3 rounded-s-lg p-1.5 md:p-3 w-9 aspect-[9/11] focus:ring-secondary-1 focus:ring-2 focus:outline-none">
          <svg className="w-2.5 md:w-3 aspect-square text-main" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M1 1h16" />
          </svg>
        </button>
        <input
          value={years.end}
          onChange={(event) => {
            const val = parseInt(event.target.value)
            setYears((prev) => { return { ...prev, end: (val > 2002 && val < 2028) ? val : prev.end } })
          }}
          type="text" className="bg-light-secondary-0 border-x-0 border-secondary-4 h-[32.75px] md:h-11 text-center text-main text-sm focus:ring-secondary-5 focus:border-secondary-5 block w-full py-2.5" placeholder="2015" required />
        <button
          onClick={() => { setYears((prev) => { return { ...prev, end: (prev.end < 2027) ? prev.end + 1 : prev.end } }) }}
          type="button"
          className="bg-light-secondary-1 hover:bg-light-secondary-3 border border-secondary-3 rounded-e-lg p-1.5 md:p-3 w-9 aspect-[9/11] focus:ring-secondary-1 focus:ring-2 focus:outline-none">
          <svg className="w-2.5 md:w-3 aspect-square text-main" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M9 1v16M1 9h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}

{/* 
<div className='flex items-center justify-evenly'>
  <div>
    <span>From</span>
    <input
      className='text-center py-1 ml-5 border-b-2'
      onChange={(e) => {
        setYears((prev) => {
          return { ...prev, start: Number.parseInt(e.target.value) }
        })
      }} type='number' min={2002} defaultValue={2002} max={2025} />
  </div>
  <span>-</span>
  <div>
    <span>Till</span>
    <input
      className='text-center py-1 ml-5 border-b-2'
      onChange={(e) => {
        setYears((prev) => {
          return { ...prev, end: Number.parseInt(e.target.value) }
        })
      }} type='number' min={2003} defaultValue={2023} max={2026} />
  </div>
</div>      
*/}