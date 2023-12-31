import { useContext, useState } from "react"
import { NavContent } from "./SideNarBar"
import { AppContext } from "../../context/AppContext"

export default function NavBar({ selectedPage, setSelectedPage }: {
  selectedPage: "yearly" | "list" | "rankings" | "detail" | "conclusion"
  setSelectedPage: React.Dispatch<React.SetStateAction<"yearly" | "list" | "rankings" | "detail" | "conclusion">>
}) {
  const [toggle, setToggle] = useState(false)
  const { changeTheme } = useContext(AppContext)

  return (
    <nav className="fixed top-0 left-0  w-full flex items-center sm:hidden border-b  bg-light-secondary-1 text-main z-[60] justify-between px-5">
      <div className="flex items-center text-dark-secondary-2 space-x-1 text-2xl xl:text-3xl laptop:text-4xl font-extrabold w-full py-3 ">
        <svg className="w-8 aspect-square" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M4 4C4.55228 4 5 4.44772 5 5V18H20C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V5C3 4.44772 3.44772 4 4 4ZM11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5ZM13.5 14C14.3284 14 15 13.3284 15 12.5C15 11.6716 14.3284 11 13.5 11C12.6716 11 12 11.6716 12 12.5C12 13.3284 12.6716 14 13.5 14ZM20 5.5C20 6.32843 19.3284 7 18.5 7C17.6716 7 17 6.32843 17 5.5C17 4.67157 17.6716 4 18.5 4C19.3284 4 20 4.67157 20 5.5ZM13.5 10C14.3284 10 15 9.32843 15 8.5C15 7.67157 14.3284 7 13.5 7C12.6716 7 12 7.67157 12 8.5C12 9.32843 12.6716 10 13.5 10ZM19 12.5C19 13.3284 18.3284 14 17.5 14C16.6716 14 16 13.3284 16 12.5C16 11.6716 16.6716 11 17.5 11C18.3284 11 19 11.6716 19 12.5ZM7.5 16C8.32843 16 9 15.3284 9 14.5C9 13.6716 8.32843 13 7.5 13C6.67157 13 6 13.6716 6 14.5C6 15.3284 6.67157 16 7.5 16Z" fill="currentColor" />
        </svg>
        <span>Dashboard</span>
      </div>

      <div className="flex space-x-2 items-center">
        <button className="hover:cursor-pointer text-left text-dark-secondary-3 border-dark-secondary-3 flex space-x-3 items-center" onClick={() => {
          changeTheme()
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        </button>
        <div className="relative mr-2">
          <button
            onClick={() => setToggle(prev => !prev)}
            className="px-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
          </button>
          <div className={`nav-content shadow-lg absolute right-0 top-16 w-48 ${toggle ? 'block' : 'hidden'} flex flex-col bg-light-secondary-1 border w-48`}>
            <NavContent selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
          </div>
        </div>
      </div>
    </nav>
  )
}

/**

<nav className='w-full flex bg-dark-secondary-0 text-base-main justify-center'>
  <div className="flex items-center justify-between w-full max-w-[1432px] ">  
    <div className='text-3xl font-semibold px-5 py-3'>
      Dashboard
    </div>
    <div className="flex space-x-7 font-bold mr-10">
      <button className="hover:underline">Yearly Data</button>
      <button className="hover:underline">Country Ranking</button>
    </div>
    <div></div>
  </div>
</nav>

 */