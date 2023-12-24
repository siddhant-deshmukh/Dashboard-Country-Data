import React, { useEffect, useState } from "react"
import { ICountriesInfo, IFieldsState, ISubjectsInfo } from "../types"
import { ApolloError, gql, useQuery } from "@apollo/client"

export const AppContext = React.createContext<{
  fieldsState: IFieldsState | undefined
  fields: {
    loading: boolean
    error: ApolloError | undefined
  }
}>({
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

  // const [ fieldsState, setFeildsState ] = useState<IFieldsState>({countries: undefined, subjects: undefined})

  const { loading, error, data: fieldsState } = useQuery<IFieldsState>(GET_COUNTRIES_SUBJECTS, {
    fetchPolicy: 'cache-first'
  });
  
  return (
    <AppContext.Provider value={{ fieldsState, fields: { loading, error } }}>
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
    }
  }
`