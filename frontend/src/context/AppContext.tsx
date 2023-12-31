import React, { useCallback, useEffect, useState } from "react"
import { IFieldsState, TColorThemeOptions } from "../types"
import { ApolloError, gql, useQuery } from "@apollo/client"
import { SwitchTheme } from "../Themes"

export const AppContext = React.createContext<{
  gErrors: string[]
  setGErrors: React.Dispatch<React.SetStateAction<string[]>>
  changeTheme: () => void
  colorTheme: TColorThemeOptions
  fieldsState: IFieldsState | undefined
  fields: {
    loading: boolean
    error: ApolloError | undefined
  }
}>({
  gErrors: [],
  setGErrors: () => {},
  changeTheme: () => {},
  colorTheme: "grey",
  fieldsState: {
    countries: undefined,
    subjects: undefined,
  },
  fields: {
    loading: true,
    error: undefined
  }
})

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [gErrors, setGErrors] = useState<string[]>([])
  const [colorTheme, setColorTheme] = useState<TColorThemeOptions>('grey')

  const { loading, error, data: fieldsState } = useQuery<IFieldsState>(GET_COUNTRIES_SUBJECTS, {
    fetchPolicy: 'cache-first'
  });
  
  const changeTheme = useCallback(() => {
    setColorTheme((prev) => {
      if (prev === "grey") return "dark-blue"
      else if (prev === "dark-blue") return "light-blue"
      else return "grey"
    })
  }, [setColorTheme])

  useEffect(() => {
    SwitchTheme(colorTheme, document)
  }, [colorTheme])

  return (
    <AppContext.Provider value={{ colorTheme, gErrors, setGErrors, fieldsState, fields: { loading, error }, changeTheme }}>
      {children}
    </AppContext.Provider>
  )
}

const GET_COUNTRIES_SUBJECTS = gql`
  query QueryGetDataFields {
    countries {
      code
      name
      iso
    }
    subjects {
      code
      name
      scale
      units
      description
      notes
    }
  }
`