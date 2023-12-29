import { useContext } from "react"
import { AppContext } from "../../context/AppContext"

export default function SideNarBar({ selectedPage, setSelectedPage }: {
  selectedPage: "yearly" | "list" | "rankings" | "detail" | "conclusion"
  setSelectedPage: React.Dispatch<React.SetStateAction<"yearly" | "list" | "rankings" | "detail" | "conclusion">>
}) {

  return (
    <aside className="nav-content fixed hidden sm:flex flex-col top-0 left-0 w-48 xl:w-64 laptop:w-80 h-screen bg-light-secondary-1">
      <div className="flex  items-center space-x-1 text-xl xl:text-2xl laptop:text-3xl font-extrabold w-full p-4">
        <svg className="w-8 aspect-square " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M4 4C4.55228 4 5 4.44772 5 5V18H20C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V5C3 4.44772 3.44772 4 4 4ZM11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5ZM13.5 14C14.3284 14 15 13.3284 15 12.5C15 11.6716 14.3284 11 13.5 11C12.6716 11 12 11.6716 12 12.5C12 13.3284 12.6716 14 13.5 14ZM20 5.5C20 6.32843 19.3284 7 18.5 7C17.6716 7 17 6.32843 17 5.5C17 4.67157 17.6716 4 18.5 4C19.3284 4 20 4.67157 20 5.5ZM13.5 10C14.3284 10 15 9.32843 15 8.5C15 7.67157 14.3284 7 13.5 7C12.6716 7 12 7.67157 12 8.5C12 9.32843 12.6716 10 13.5 10ZM19 12.5C19 13.3284 18.3284 14 17.5 14C16.6716 14 16 13.3284 16 12.5C16 11.6716 16.6716 11 17.5 11C18.3284 11 19 11.6716 19 12.5ZM7.5 16C8.32843 16 9 15.3284 9 14.5C9 13.6716 8.32843 13 7.5 13C6.67157 13 6 13.6716 6 14.5C6 15.3284 6.67157 16 7.5 16Z" fill="currentColor" />
        </svg>
        <span>Dashboard</span>
      </div>
      <NavContent selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
    </aside>
  )
}

export function NavContent({ selectedPage, setSelectedPage }: {
  selectedPage: "yearly" | "list" | "rankings" | "detail" | "conclusion"
  setSelectedPage: React.Dispatch<React.SetStateAction<"yearly" | "list" | "rankings" | "detail" | "conclusion">>
}) {
  const { changeTheme } = useContext(AppContext)

  return (
    <>
      <ul className="text-left">
        <div>
          <h4>Country Comparisons:</h4>
          <ul className="">
            <button className={`${(selectedPage === "yearly") ? "bg-dark-secondary-3 text-base-main hover:bg-dark-secondary-2" : ""} text-left`}
              onClick={() => { setSelectedPage("yearly") }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${(selectedPage === "yearly") ? 'text-base-main hover:text-main' : 'text-main'} w-5 aspect-square`}>
                <path fillRule="evenodd" d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z" clipRule="evenodd" />
              </svg>
              <span className={`${(selectedPage === "yearly") ? 'text-base-main hover:text-main' : 'text-main'}`}>
                Yearly Data
              </span>
            </button>
            <button className={`${(selectedPage === "list") ? "bg-dark-secondary-3 text-base-main hover:bg-dark-secondary-2" : ""} text-left`}
              onClick={() => { setSelectedPage("list") }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${(selectedPage === "list") ? 'text-base-main hover:text-main' : 'text-main'} w-5 aspect-square`}>
                <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
              </svg>
              <span className={`${(selectedPage === "list") ? 'text-base-main hover:text-main' : 'text-main'}`}>
                Countries List
              </span>
            </button>
            <button className={`${(selectedPage === "rankings") ? "bg-dark-secondary-3 text-base-main hover:bg-dark-secondary-2" : ""} text-left`}
              onClick={() => { setSelectedPage("rankings") }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${(selectedPage === "rankings") ? 'text-base-main hover:text-main' : 'text-main'} w-5 aspect-square`}>
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
              </svg>
              <span className={`${(selectedPage === "rankings") ? 'text-base-main hover:text-main' : 'text-main'}`}>
                Rankings
              </span>
            </button>
          </ul>
        </div>
        <div>
          <h4>Country Data:</h4>
          <ul>
            <button className={`${(selectedPage === "detail") ? "bg-dark-secondary-3 text-base-main hover:bg-dark-secondary-2" : ""} text-left`}
              onClick={() => { setSelectedPage("detail") }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${(selectedPage === "detail") ? 'text-base-main hover:text-main' : 'text-main'} w-5 aspect-square`}>
                <path d="M11.625 16.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z" />
                <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 0 0 1.06-1.06l-1.047-1.048A3.375 3.375 0 1 0 11.625 18Z" clipRule="evenodd" />
                <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
              </svg>
              <span className={`${(selectedPage === "detail") ? 'text-base-main hover:text-main' : 'text-main'}`}>
                Data in Detail
              </span>
            </button>
            <button className={`${(selectedPage === "conclusion") ? "bg-dark-secondary-3 text-base-main hover:bg-dark-secondary-2" : ""} text-left`}
              onClick={() => { setSelectedPage("conclusion") }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${(selectedPage === "conclusion") ? 'text-base-main hover:text-main' : 'text-main'} w-5 aspect-square`}>
                <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
              </svg>
              <span className={`${(selectedPage === "conclusion") ? 'text-base-main hover:text-main' : 'text-main'}`}>
                Conclusions
              </span>
            </button>
          </ul>
        </div>
      </ul>
      <div className="mt-0 sm:mt-auto flex flex-col">
        <div className="flex justify-start px-4 mb-2 sm:mb-5">
          <button className="hover:cursor-pointer text-left px-2 xl:px-4 py-2 xl:py-3 font-bold text-dark-secondary-3 rounded-full border-2 border-dark-secondary-3 flex space-x-3 items-center" onClick={() => {
            changeTheme()
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 xl:w-8 aspect-square">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
            <span className="text-sm xl:text-lg">Change Theme</span>
          </button>
        </div>

        <div className="pb-2 sm:pb-10 pt-3 w-full max-w-[240px] mx-3 px-2">
          <div className="flex flex-col mb-0 sm:mb-3  text-left">
            <h2 className="text-[10px] xl:text-xs">Designed and Created by</h2>
            <h3 className="text-base xl:text-lg laptop:text-xl font-extrabold laptop:font-semibold">Siddhant Deshmukh</h3>
          </div>
          <ul className="flex justify-start space-x-2 xl:justify-between">
            <a href="https://github.com/siddhant-deshmukh" className="text-primary">
              <span className="sr-only">Portfolio</span>
              <svg className="w-6 xl:w-8 laptop:w-10 aspect-square" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </a>
            <a href="https://github.com/siddhant-deshmukh" className="text-primary">
              <span className="sr-only">GitHub</span>
              <svg className="w-6 xl:w-8 laptop:w-10 aspect-square" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="mailto:learner.siddhant.deshmukh@gmail.com" className="text-primary">
              <span className="sr-only">Mail</span>
              <svg className="w-6 xl:w-8 laptop:w-10 aspect-square" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/siddhant-sd/" className="text-primary">
              <span className="sr-only">Linkedin</span>
              <svg className="w-6 xl:w-8 laptop:w-10 aspect-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50">
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
              </svg>
            </a>
          </ul>
        </div>
      </div>
    </>
  )
}