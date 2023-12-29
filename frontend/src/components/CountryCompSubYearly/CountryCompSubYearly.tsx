import {  useState } from 'react'

import ChangeYearly from './ChangeYearly'
import ManageCountries from './ManageCountries'
import { ICountryCompLinearData, ISubjectsInfo } from '../../types'
import LinePlot_Country_Comparisons_Yearly from './LinePlotsCountryComp'

export function CountryCompSubYearly({ subject, graphWidth: width, deleteSubject, index }: {
  index: number
  graphWidth: number
  subject: ISubjectsInfo
  deleteSubject: (index: number) => void
}) {

  const [graphData, setGraphData] = useState<ICountryCompLinearData[]>([])
  const [years, setYears] = useState<{ start: number, end: number }>({ start: 2002, end: 2027 })
  const [minMax, setMinMax] = useState<{ min: number | undefined, max: number | undefined }>({ min: 0, max: undefined })
  // const [countries, setCountries] = useState<ICountriesInfo[]>([{code: 534, iso: 'IND', name:'India'}])

  //  (subject)
  return (
    <div className='relative px-2 sm:px-5 py-5 rounded-lg border border-light-secondary-3 shadow-xl shadow-light-secondary-0 w-full max-w-[640px] desktop:max-w-[680px]'>
      <div className=''>
        <Heading deleteSubject={deleteSubject} subject={subject} index={index} />

        <ManageCountries
          years={years}
          subject={subject}
          minMax={minMax} setMinMax={setMinMax}
          graphData={graphData} setGraphData={setGraphData} />
        {/* The graph */}
        {/* startYPoint={minMax.min} endYPoint={minMax.max} */}
        {
          graphData.length > 0 &&
          <div className='border-b'>
            <div className='pt-5 mx-auto overflow-x-auto' style={{ width: width }}>
              <LinePlot_Country_Comparisons_Yearly
                subject={subject}
                countriesData={graphData} years={years} startYPoint={minMax.min} endYPoint={minMax.max}
                width={(width < 394) ? 394 : width} />
            </div>
            <div className='text-center w-full font-bold py-1 text-main-1'>Years</div>
          </div>
        }

        {/* Select Year period */}
      </div>

      <div className='mt-3 px-2 sm:px-0'>
        <ChangeYearly years={years} setYears={setYears} />
      </div>
    </div>
  )
}

function Heading({ index, subject, deleteSubject }: {
  index: number
  subject: ISubjectsInfo
  deleteSubject: (index: number) => void
}) {
  const [toggle, setToggle] = useState(false)

  return (
    <div className='px-2 sm:px-0 text-sm desktop:text-base'>
      <div className='flex justify-between'>
        <div className='flex justify-start items-end space-x-2'>
          <h1 className='text-left text-xl desktop:text-3xl text-main-0 font-semibold'>{subject.name}</h1>
          <p className='text-main-3 font-bold pb-0.5'>({subject.code})</p>
        </div>

        <button
          onClick={() => { deleteSubject(index) }}
          className='p-4 absolute top-0 right-0  border-dark-secondary-3 z-10 rounded-tr-lg'>
          {/* absolute p-2  border-dark-secondary-3 z-10 rounded-tr-lg top-0 right-0 */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[25px] desktop:w-[35px] aspect-square">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className='text-main-1 mt-1'>
        {
          (!toggle && subject.notes.length > 150) &&
          <>
            <span>{subject.notes.slice(0, 150)}</span>
            <span className='underline  relative  font-bold ml-1 group'>
              <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setToggle((prev) => !prev)
                  }
                }}
                className='cursor-pointer text-dark-secondary-2 underline lg:hover:cursor-default'>
                Read More
              </button>
              <div className='absolute  border-2 border-dark-secondary-2 shadow-lg p-3 hidden group-hover:block top-6 z-50 bg-base-main text-xs'>
                {subject.notes}
              </div>
            </span>
          </>
        }
        {
          (toggle || subject.notes.length < 150) &&
          <>
            <span>{subject.notes}</span>
            <span className='underline relative  font-bold ml-1 group'>
              <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setToggle((prev) => !prev)
                  }
                }}
                className='cursor-pointer text-dark-secondary-2 underline lg:hover:cursor-default'>
                Read Less
              </button>
            </span>
          </>
        }
      </div>

      <div className='flex justify-end my-2.5 space-x-2 desktop:my-4 text-xs desktop:text-base'>
        {/* flex-col-reverse sm:flex-row space-y-2 sm:space-y-0 items-end space-x-0 sm:space-x-2  */}
        <div className='flex border border-light-secondary-3 rounded-md overflow-hidden'>
          <p className='py-1.5 desktop:py-2 px-2.5 desktop:px-3 bg-light-secondary-2 font-semibold text-main'>Unit : </p>
          <h3 className='py-1.5 desktop:py-2 px-2.5 desktop:px-3 bg-dark-secondary-3 font-bold text-base-main'>{subject.units}</h3>
        </div>
        {
          subject.scale && subject.scale != 'Units' &&
          <div className='flex border border-light-secondary-3 rounded-md overflow-hidden'>
            <p className='py-1.5 desktop:py-2 px-2.5 desktop:px-3 bg-light-secondary-2 font-semibold text-main'>Scale : </p>
            <h3 className='py-1.5 desktop:py-2 px-2.5 desktop:px-3 bg-dark-secondary-3 font-bold text-base-main'>{subject.scale}</h3>
          </div>
        }
      </div>



    </div>

  )
}