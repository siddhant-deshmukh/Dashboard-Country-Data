import React, { useCallback, useEffect, useState } from "react"
import { IFieldsState, TColorThemeOptions } from "../types"
import { ApolloError, gql, useQuery } from "@apollo/client"
import { SwitchTheme } from "../Themes"

const DefaultFieldsState: IFieldsState = {
  countries: [
    {
      "code": 111,
      "name": "United States",
      "iso": "USA"
    },
    {
      "code": 534,
      "name": "India",
      "iso": "IND"
    },
    {
      "code": 134,
      "name": "Germany",
      "iso": "DEU"
    },
    {
      "code": 158,
      "name": "Japan",
      "iso": "JPN"
    }
  ],
  subjects: [
    {
      "code": "GGX",
      "name": "Goverment Expenditure",
      "scale": "Billions",
      "units": "National currency",
      "description": "General government total expenditure",
      "notes": "Total expenditure consists of total expense and the net acquisition of nonfinancial assets. Note: Apart from being on an accrual basis, total expenditure differs from the GFSM 1986 definition of total expenditure in the sense that it also takes the disposals of nonfinancial assets into account."
    },
    {
      "code": "NGDP",
      "name": "GDP (Current)",
      "scale": "Billions",
      "units": "National currency",
      "description": "Gross domestic product, current prices",
      "notes": "Expressed in billions of national currency units. Expenditure-based GDP is total final expenditures at purchasers' prices (including the f.o.b. value of exports of goods and services), less the f.o.b. value of imports of goods and services. [SNA 1993]"
    },
    {
      "code": "NGDPDPC",
      "name": "GDP Per Capita (Current)",
      "scale": "Units",
      "units": "U.S. dollars",
      "description": "Gross domestic product per capita, current prices",
      "notes": "GDP is expressed in current U.S. dollars per person. Data are derived by first converting GDP in national currency to U.S. dollars and then dividing it by total population."
    },
    {
      "code": "NGSD_NGDP",
      "name": "Gross national savings",
      "scale": undefined,
      "units": "Percent of GDP",
      "description": "Gross national savings",
      "notes": "Expressed as a ratio of gross national savings in current local currency and GDP in current local currency. Gross national saving is gross disposable income less final consumption expenditure after taking account of an adjustment for pension funds. [SNA 1993] For many countries, the estimates of national saving are built up from national accounts data on gross domestic investment and from balance of payments-based data on net foreign investment."
    },
  ]
}

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
  setGErrors: () => { },
  changeTheme: () => { },
  colorTheme: "grey",
  fieldsState: DefaultFieldsState,
  fields: {
    loading: true,
    error: undefined
  }
})

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [gErrors, setGErrors] = useState<string[]>([])
  const [colorTheme, setColorTheme] = useState<TColorThemeOptions>('grey')
  // const [fieldsState, setFieldsState] = useState<IFieldsState>(DefaultFieldsState)
  const { loading, error, } = useQuery<IFieldsState>(GET_COUNTRIES_SUBJECTS, { //data: fieldsData
    fetchPolicy: 'cache-first'
  });

  // useEffect(() => {
  //   if(fieldsData){
  //     setFieldsState
  //   }
  // }, [fieldsData])

  // console.log('fieldState', fieldsState)

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
    <AppContext.Provider value={{
      colorTheme,
      changeTheme,
      gErrors,
      setGErrors,
      fields: { loading, error },
      fieldsState: DefaultFieldsState,
    }}>
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