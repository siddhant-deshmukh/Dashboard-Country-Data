import { useCallback, useContext, useEffect, useState } from 'react'

import { ISubjectsInfo } from '../../types'
import { AppContext } from '../../context/AppContext'
import { CountryCompSubYearly } from './CountryCompSubYearly'
import { SelectSubject } from '../SelectField/SelectSubjectCode'

const DefaultSubjectsCodeList: string[] = ["NGDP", "NGSD_NGDP", "NGDPDPC"] //"NGSD_NGDP", "NGDPDPC"

export default function CountryCompSubYearlyList() {

  const { fieldsState } = useContext(AppContext)
  const AllSubjects = fieldsState?.subjects

  const [graphWidth, setWidth] = useState(640)
  const [subjects, setSubjects] = useState<ISubjectsInfo[]>([])
  const [selected, setSelected] = useState<ISubjectsInfo | null>(null)

  function addSubject(selected: ISubjectsInfo | null) {
    if (selected) {
      setSubjects(prev => {
        setSelected(null)
        return [selected].concat(prev.slice())
      })
    }
  }
  const deleteSubject = useCallback((index: number) => {
    if (index === 0) {
      setSubjects((prev) => {
        return prev.slice(1)
      })
    } else {
      setSubjects((prev) => {
        return prev.slice(0, index).concat(prev.slice(index + 1))
      })
    }
  }, [setSubjects])

  // Just to set Default subjects
  useEffect(() => {
    if (AllSubjects) {
      const DefaultSubjects = AllSubjects?.filter((subject_info) => {
        return DefaultSubjectsCodeList.indexOf(subject_info.code) != -1
      })
      // console.log(DefaultSubjectsCodeList, DefaultSubjects)
      setSubjects(DefaultSubjects)
    }
  }, [AllSubjects])
  // Will adjust the width of the graph
  useEffect(() => {
    function FunListner() {
      const window_width = window.innerWidth

      if (window_width < 640) {
        setWidth(window_width - 70)
      } else if (window_width < 770) {
        setWidth(window_width - 260)
      } else if (window_width < 1024) {
        setWidth(500)
      } else if (window_width < 1280) {
        setWidth((window_width - 300) / 2)
      } else if (window_width < 1500) {
        setWidth((window_width - 440) / 2)
      } else if (window_width < 1750) {
        setWidth((window_width - 500) / 2) // 320 (aside navbar) + 40 (Margin Left) + 20 (gap) + 
      } else {
        setWidth(640)
      }
    }

    FunListner()
    window.addEventListener('resize', FunListner)

    return () => {
      window.removeEventListener('resize', FunListner)
    }
  }, [setWidth])

  return (
    <div className='flex flex-col my-2'>
      <div className='flex px-0 sm:px-1 flex-col my-3'>
        <h2 className='font-bold text-2xl sm:text-3xl laptop:text-4xl text-main-secondary-0'>Country's Yearly Comparison</h2>
        <div className='px-0 sm:px-1'>
          <h4 className='font-semibold text-sm sm:text-base laptop:text-lg text-main-secondary-1 my-1.5'>Here you can compare yearly data of different countries in plot manner.</h4>
          <ul className='list-disc pl-5 text-sm laptop:text-base text-main-secondary-2 my-3'>
            <li>
              Original Version:
              <a className='font-bold underline text-dark-secondary-1 ml-1' href='https://github.com/siddhant-deshmukh/Dashboard-Country-Data' target='_blank'>Github Repo</a>
            </li>
            <li>
              This is the demo / deployed version of the app.
            </li>
            <li>
              Original have backend made with
              <span className='font-medium ml-0.5'>GraphQL</span>,
              <span className='font-medium ml-0.5'>Flask (Python)</span>,
              <span className='font-medium ml-0.5'>PostgreSQL</span>.
            </li>
          </ul>
        </div>
      </div>
      <div className='px-0 sm:px-1 flex flex-col justify-start space-y-2 items-start pt-2 pb-5'>
        <h3 className='text-lg laptop:text-xl font-bold text-main-secondary-0'>Select a subject to create new Comparison Graph.</h3>
        <div className='flex '>
          <SelectSubject setSelected={setSelected} selected={selected} />
          <button
            onClick={() => {
              addSubject(selected)
            }}
            className='bg-dark-secondary-3 text-base-main px-3 py-2 font-semibold ml-2 rounded-lg'>
            Add
          </button>
        </div>
      </div>
      <ul className='grid grid-cols-1 lg:grid-cols-2 laptop:grid-cols-2 gap-x-5 gap-y-10 w-full'>
        {
          subjects.map((subject, index) => {
            return <div
              key={"subject" + subject.code + index.toString()}
              className={`w-auto lg:w-full desktop:w-auto place-self-center lg:${index % 2 === 0 ? 'place-self-start' : 'place-self-end'}`}>
              <CountryCompSubYearly index={index} deleteSubject={deleteSubject} graphWidth={graphWidth} subject={subject} />
            </div>
          })
        }
      </ul>
    </div>
  )
}

