import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ICountriesInfo, ICountryCompLinearData, ISubjectsInfo } from '../../types';
import { SelectCountry } from '../SelectField/SelectCountry';
import { GetCountrySubData } from './Utils';
import { useApolloClient } from '@apollo/client';
import { AppContext } from '../../context/AppContext';

const DefaultCountries: ICountriesInfo[] = [
  {
    "name": "Germany",
    "iso": "DEU",
    "code": 134,
  },
  {
    "name": "Japan",
    "iso": "JPN",
    "code": 158,
  },
  {
    "name": "India",
    "iso": "IND",
    "code": 534,
  },
]

export default function ManageCountries({
  years,
  subject,
  minMax,
  setMinMax,
  graphData,
  setGraphData,
}: {
  graphData: ICountryCompLinearData[],
  setError: React.Dispatch<React.SetStateAction<string>>
  setGraphData: React.Dispatch<React.SetStateAction<ICountryCompLinearData[]>>,
  years: {
    start: number;
    end: number;
  },
  minMax: {
    min: number | undefined;
    max: number | undefined;
  },
  setMinMax: React.Dispatch<React.SetStateAction<{
    min: number | undefined;
    max: number | undefined;
  }>>
  subject: ISubjectsInfo
}) {

  const [loading, setLoading] = useState(false)
  const { setGErrors } = useContext(AppContext)

  const client = useApolloClient()
  const initialized = useRef(false)
  const [selectedCountry, setSelectedCountry] = useState<ICountriesInfo | null>(null)
  const colors = useRef<string[]>(["#000000", "#FF0000", "#FFFF00", "#fc7f03", "#00FFFF", "#FFAA33", "#DB00F0", "#01F50D", "#fcba03", "#004EE0", "#E61F00"])

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      const PromiseArr = DefaultCountries.map(async (country) => {
        addNewCountryData(country)
      })

      Promise.all(PromiseArr).finally(() => {
        setLoading(false)
      })
    }
  }, [setLoading])

  // useEffect(() => {
  //   if (years.start < years.end) {
  //     const promiseArr = graphData.map(({ country, color }) => {
  //       return GetCountrySubData(client, country, subject.code, years.start, years.end, color)
  //     })
  //     Promise.all(promiseArr).then((data) => {
  //       // console.log("After change!", data)

  //       const temp_data: ICountryCompLinearData[] = []
  //       data.forEach((d) => {
  //         if (d) {
  //           temp_data.push(d)
  //         }
  //       })
  //       setGraphData(temp_data)
  //     })
  //   }
  // }, [years])

  const addNewCountryData = useCallback(async (country: ICountriesInfo) => {
    const data = await GetCountrySubData(client, country, subject.code, 2002, 2027, "", setGErrors)
    const limits: { min?: number, max?: number } = { min: 0, max: undefined }

    data?.data.forEach((value) => {
      if(!limits.min || limits.min > value){
        limits.min = value
      } 
      if(!limits.max || limits.max < value){
        limits.max = value
      }
    })
    setMinMax((prev) => {
      let final = { ...prev }
      if (limits.min && (!final.min || final.min > limits.min)) {
        if (!limits.min || limits.min > 0) limits.min = 0;

        final = { ...final, min: limits.min }
      }
      if (limits.max && (!final.max || final.max < limits.max)) {
        final = { ...final, max: limits.max }
      }
      return final
    })
    
    if (data) {
      let color = colors.current.pop()
      data.color = (color) ? color : "black"

      setGraphData((prev) => {
        return prev.slice().concat(data)
      })
    }
  }, [graphData, minMax, setGraphData, setMinMax])

  const removeCountryData = useCallback((country: ICountriesInfo) => {
    setGraphData(prev => {
      let arr = prev.slice()
      let index = -1
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].country.iso == country.iso) {
          index = i;
          break;
        }
      }

      const finalData = (index === 0) ?
        arr.slice(1) :
        arr.slice(0, index).concat(arr.slice(index + 1))

      let color_ = undefined
      let min: number | undefined = undefined
      let max: number | undefined = undefined

      finalData.forEach(({ country: curr_country, data, color }) => {
        if (country.iso != curr_country.iso) {
          data.forEach((value) => {
            if (!min || value < min) {
              min = value
            }
            if (!max || value > max) {
              max = value
            }
          })
        } else {
          if (color) {
            color_ = color
          }
        }
      })
      // console.log(min, max)
      if (color_) {
        colors.current.push(color_)
      }

      if (!min || min > 0) min = 0;

      setMinMax({ min, max })
      return finalData
    })


  }, [setGraphData, setMinMax])

  return (
    <div className='text-xs md:text-sm'>

      <ul className='flex flex-wrap mt-2'>
        {
          graphData.map(({ country, color }, index) => {
            const isColorHash = color && color.slice(0, 1) === "#"
            return <span
              className='rounded-md group relative font-medium mr-1.5 md:mr-2 border my-1.5 md:my-2'
              key={country ? country.iso : index}
              style={{
                borderColor: (isColorHash) ? (color) : "rgb(156, 163, 175 60)",
                color: (isColorHash) ? (color) : "rgb(156, 163, 175 60)",
                background: (isColorHash) ? (color + "10") : "rgb(156, 163, 175 60)",
              }}
            >
              <button className='px-2 py-0.5 md:px-3 md:py-1' onClick={() => {
                removeCountryData(country)
              }}>
                <p >{country.name}</p>
              </button>
              <div className='group-hover:block hidden absolute text-xs bg-base-main text-main font-bold font-mono top-10 border shadow-lg px-2 py-1 '>
                Remove
              </div>
            </span>
          })
        }
        <div className='flex items-center'>
          <SelectCountry setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} />
          <button
            className='bg-dark-secondary-3 text-base-main font-semibold rounded-lg px-2 py-1.5 md:py-2 ml-1'
            onClick={() => {
              if (selectedCountry) {
                addNewCountryData(selectedCountry)
              }
            }}
          >Add</button>
        </div>
      </ul>
    </div>
  )
}

/**

return (
    <>
      <div className='flex'>
        <SelectCountry setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} />
        <button
          className=' text-base-main font-semibold rounded-lg px-2 py-2 ml-1'
          onClick={() => {
            if (selectedCountry) {
              // setCountries(prev => {
              //   setSelectedCountry(null)
              //   return prev.slice().concat([selectedCountry])
              // })
              addNewCountryData(selectedCountry)
            }
          }}
        >Add</button>
      </div>
      <ul className='pt-4'>
        {
          graphData.map(({ country, color }, index) => {
            return <li key={country ? country.iso : index} className='w-full py-2 flex justify-between space-x-2 pl-2 pr-3 border mt-1 overflow-x-hidden'>
              <div className='flex items-center'>
                <div style={{ background: color }} className={`w-10 h-5 mr-2`}></div>
                <p>{country.name}</p>
              </div>
              <button onClick={() => {
                removeCountryData(country)
              }}>
                X
              </button>
            </li>
          })
        }
      </ul>
    </>
  )

 */
